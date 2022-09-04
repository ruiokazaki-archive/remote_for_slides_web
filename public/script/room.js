const [_, _room, roomId] = location.pathname.split('/');
console.log({ roomId });

const [prevButton, nextButton] = document.querySelectorAll('button');
prevButton.addEventListener('click', () => {
  console.log('prev');
});
nextButton.addEventListener('click', () => {
  console.log('next');
});
