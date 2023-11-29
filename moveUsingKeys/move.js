document.addEventListener('DOMContentLoaded', init);

function init() {
  window.addEventListener('keydown', (Event) => {
    if (Event.key !== undefined) {
      console.log(Event.key);
      switch (Event.key) {
        case 'ArrowUp': moveUp(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break
      }
    }
  }
  )

  const circle = document.getElementById('#circle');
  const position = [0, 0];
  function move() {
    circle.style.top = position[0] + 'px';
    circle.style.left = position[1] + 'px';
  }
  function moveUp() {
    position[0] -= 10;
    move();
  }
  function moveRight() {
    position[1] += 10;
    move();
  }
  function moveLeft() {
    position[1] -= 10;
  }
  function moveDown() {
    position[0] += 10;
    move();
  }
}
// }