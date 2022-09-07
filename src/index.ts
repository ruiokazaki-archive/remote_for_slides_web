import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import shortid from 'shortid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const port = process.env.PORT || 3333;

const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
app.use(allowCrossDomain);
app.use(express.static('public'));

// web route
app.get('/', async (_, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/room/:roomId', async (_, res) => {
  res.sendFile(__dirname + '/room.html');
});

// api route
app.get("/uuid", (req, res) => {
  res.json({uuid: shortid.generate()});
});

app.get('/check-valid/:roomId', async (req, res) => {
  res.json({ status: 200, roomId: req.params.roomId });
  // res.json({ status: 403, message: 'Invalid room id' });
});

// socket
io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on('join', (value) => {
    socket.join(value);
  });

  socket.on('event', (value) => {
    io.to(value.uuid).emit("event", value.event);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

// start server
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
