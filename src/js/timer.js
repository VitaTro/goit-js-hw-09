import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const buttonStart = document.querySelector('[data-start]');
const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
 
// 

buttonStart.setAttribute('disabled', '');
let actualDate;
let timeRemaining = 0;
let mainInterval;

// стала робить, щоб завжди було двозначне число, навіть якщо тут є менше 10

const addLeadingZero = (value) => value.toString().padStart(2, '0');


// конвертація в мілісекунди...
function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
    // ...день
      const days = Math.floor(ms / day);
    // ...година
      const hours = Math.floor((ms % day) / hour);
    // ...хвилина
      const minutes = Math.floor(((ms % day) % hour) / minute);
    // ...секунда
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
    }
  
    const options = {
         enableTime: true,  //цей параметр дозволяє вибирати час і дату. false відключає його
        time_24hr: true,  //цей параметр вказує на 24-годинний формат. false робить 12-годинний
        defaultDate: new Date(),  //цей параметр вмикає поточну дату та час
        minuteIncrement: 1,  //цей параметр вказує, що тут буде доступна кожна хвилина доступною
        onClose(selectedDates) {
          actualDate = new Date();  //функція викликається при закритті віджета. 
        

// якщо обрана дата менше від поточної дати, то буде повідомлення.
// якщо обрана дата більше, то активується старт, і піде обчислення, 
// скільки залишилось до обраної дати

      if(selectedDates[0] < actualDate) {
        Notiflix.Notify.failure('Please select a future date');
      } else {
        if(mainInterval) {
            clearInterval(mainInterval);
            timerDay.innerHTML = addLeadingZero(0); 
 timerHours.innerHTML = addLeadingZero(0); 
 timerMinutes.innerHTML = addLeadingZero(0); 
 timerSeconds.innerHTML = addLeadingZero(0); 
        }
        buttonStart.removeAttribute('disabled');
        timeRemaining = (selectedDates[0].getTime() - actualDate.getTime());
      }
    },
}; 
// обчислення мілісекунд

    const countDownTime = (time) => {
        mainInterval = setInterval(() => {
if(time - 1000 > 0) {
    time -= 1000;
    let timerInner = convertMs(time);
    timerDay.innerHTML = addLeadingZero(timerInner.days);
    timerHours.innerHTML = addLeadingZero(timerInner.hours);
    timerMinutes.innerHTML = addLeadingZero(timerInner.minutes);
    timerSeconds.innerHTML = addLeadingZero(timerInner.seconds);
} else {
    clearInterval(mainInterval);
}
        }, 1000)
    }

    // запускається бібліотека, при натисканні на кнопку лічильник розпочинає відлік
// старт також вимикається для уникнення подвійного запуску

    const flatp = flatpickr('#datetime-picker', options);
    buttonStart.addEventListener('click', () => {
        countDownTime(timeRemaining);
        buttonStart.setAttribute('disabled', '');
    });


