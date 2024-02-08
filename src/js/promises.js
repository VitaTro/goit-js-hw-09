import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

// перешкодження перезавантажуванню браузера
// блокує в формі останній елемент (сабміт)

form.addEventListener('submit', (event) => {
event.preventDefault();
form.lastElementChild.setAttribute('disabled', '');

// значення інпутів перетворюються на цілі числа

const delay = Number.parseInt(firstDelay.value);
const step = Number.parseInt(stepDelay.value);

// асинхронний цикл, де є кілька варіантів вирішення задачі

for(let i = 0; i < amount.value; i++) {
    createPromise(i + 1, delay + step * i)
    .then(({ position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay}) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    .finally(() => {
        if(i === amount.value - 1) form.lastElementChild.removeAttribute('disabled');
    })
}
});

// функція, яка генерує рандомне вирішення. 

function createPromise(position, delay) {
return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
 
    // викликається асинхронну операцію
    // якщо значення true, то resolve
// якщо значення false, то reject  
  
setTimeout(() => {
    if (shouldResolve) {
resolve({ position, delay});
   }
    reject({ position, delay});
}, delay);
});
}
   