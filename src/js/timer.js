import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('[data-start]');
const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-minutes]');

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
  
