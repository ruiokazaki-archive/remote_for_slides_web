const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");

const checkValid = async (roomId) => {
  const res = await fetch(`/check-valid/${roomId}`);
  const data = await res.json();

  if (data.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const roomId = inputElement.value;

  try {
    const data = await checkValid(roomId);
    inputElement.value = "";
    window.location.href = `/room/${data.roomId}`;
  } catch (e) {
    alert(e);
    console.error(e);
  }
});
