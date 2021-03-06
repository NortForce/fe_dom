'use strict';

/**
 * @return {object}
 */
function makeCounter() {
  let count = 0; // замкнутая переменная инкапсулирована

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

/* 
 Напишите функцию createAdder(n), 
 которая вернёт другую функцию.

 Возвращенная функция должна складывать
 Получаемый аргумент m с аргументом n возвращщаюей функции.

const adder = createAdder(10);
adder(10) //20
adder(50) //70
adder(100) //170

*/

const createAdder = (n) => (m) => (n += m);

const adder = createAdder(100);
