'use strict';

const selectedCelebs = [];

const selectedCelebsList = document.getElementById('selected-celebs');
const container = document.getElementById('root');

// fetch('http://192.168.1.148:3000/users')
// .then((response)=> response.json()
// .then((data)=>{
//   const cards = data.map((card) => createCard(card));
//   container.append(...cards); 
// })).catch((err)=>{ console.log()});

fetch('./assets/js/data/data.json')
.then((response)=> response.json()
.then((celebrityList)=>{
  const cards = celebrityList.map((celebrity) => createCard(celebrity));
  container.append(...cards); 
}));
// const cards = responseData.map((data) => createCard(data));
// container.append(...cards);

