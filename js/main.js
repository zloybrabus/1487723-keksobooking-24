
function getAvatar(Rndm){
  return Rndm[Math.floor(Math.random()*Rndm.length)];
}
const rndm = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png', 'img/avatars/user09.png', 'img/avatars/user10.png'];
getAvatar(rndm);

function getTitle(Title){
  return Title[Math.floor(Math.random()*Title.length)];
}
const title = ['Представляем вашему вниманию', ' Ждем вас в гости', 'Будем рады вас видеть'];
getTitle(title);

function getAdress(min, max) {
  return Math.random() * (max - min) + min;
}
getAdress(1000, 1500);

function getPrice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getPrice(10000, 50000);

function getType(Type){
  return Type[Math.floor(Math.random()*Type.length)];
}
const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
getType(type);


function getRooms(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getRooms(1, 5);

function getGuest(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getGuest(1, 4);

function getCheckin(Checkin){
  return Checkin[Math.floor(Math.random()*Checkin.length)];
}
const checkin = ['12:00', '13:00', '14:00'];
getCheckin(checkin);

function getCheckout(Checkout){
  return Checkout[Math.floor(Math.random()*Checkout.length)];
}
const checkout = ['12:00', '13:00', '14:00'];
getCheckout(checkout);

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
function getArray(Features) {
  const maxLength = Features.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];
  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}
JSON.stringify(getArray(features));

function getDescription(Description){
  return Description[Math.floor(Math.random()*Description.length)];
}
const description = ['Уютное помещение для проведение спокойных вечеров', 'Большая квартира для проведения мероприятий и праздников', 'Сдаю только русским', 'Квартира на окрайне города для семьи'];
getDescription(description);


const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
function getPhotos(Photos) {
  const maxLength = Photos.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];
  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = Photos[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}
JSON.stringify(getPhotos(photos));

function getLat(min, max) {
  return Math.random() * (max - min) + min;
}
getLat(35.65000, 35.70000);

function getLng(min, max) {
  return Math.random() * (max - min) + min;
}
getLng(139.70000, 139.80000);

new Array(10).fill('').map((item, index) => ({
  author: getAvatar(), 
  offer: getTitle(), getAdress(), getPrice(), getType(), getRooms(), getGuest(), getCheckin(), getCheckout(), JSON.stringify(getArray()), getDescription(), JSON.stringify(getPhotos()),
  title: getLat(), getLng()
}));