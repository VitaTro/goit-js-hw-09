const buttonStart = document. querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId;

// рандомне переключення кольорів

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  
  // при натисканні на старт буде щосекунди змінюватись тло 

buttonStart.addEventListener('click', () => {

timerId = setInterval(() => {
document.body.style.backgroundColor = getRandomHexColor();
}, 1000);

buttonStart.setAttribute('disabled', '');
buttonStop.removeAttribute('disabled');
});

// при натисканні на стоп все зупиниться, до тих пір, поки не буде по новій натиснута кнопка старт

buttonStop.addEventListener('click', () => {
clearInterval(timerId);
buttonStart.removeAttribute('disabled');
buttonStop.setAttribute('disabled', '');
});