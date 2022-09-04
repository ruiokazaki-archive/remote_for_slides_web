import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// socket.io
const io = new Server(8080);

// web route
app.get('/', async (_, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/room/:roomId', async (_, res) => {
  res.sendFile(__dirname + '/room.html');
});

// api route
app.get('/check-valid/:roomId', async (req, res) => {
  res.json({ status: 200, roomId: req.params.roomId });
  // res.json({ status: 403, message: 'Invalid room id' });
});

// start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
