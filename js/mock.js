import {getRandomInteger, getRandomFloat, getRandomArrayElement} from './fncts.js';

const TITLE = [
  'Аренда квартиры', 'Аренда дома', 'Аренда комнаты',
];
const TYPE = [
  'palace', 'flat', 'house', 'bungalow', 'hotel',
];
const CHECKIN = [
  '12:00', '13:00', '14:00',
];
const CHECKOUT = [
  '12:00', '13:00', '14:00',
];
const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];
const DESCRIPTION = [
  'С видом на море', 'Большая ванная с балконом',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthor = (index) => {
  const avatarNumber = index < 10 ? `0${index}` : index;
  return {
    avatar: `img/avatars/user${avatarNumber}.png`,
  };
};

const getRandomLocation = function () {
  return {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const createOffer = function () {
  return {
    title: getRandomArrayElement(TITLE),
    address: `${getRandomLocation().lat}, ${getRandomLocation().lng}`,
    price: getRandomInteger(1000, 15000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 5),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: [getRandomArrayElement(FEATURES)],
    description: getRandomArrayElement(DESCRIPTION),
    photos: [getRandomArrayElement(PHOTOS), getRandomArrayElement(PHOTOS), getRandomArrayElement(PHOTOS)],
  };
};

const createAd = (index) => ({
  author: createAuthor(index + 1),
  offer: createOffer(),
  location: getRandomLocation(),
});

export const getMockAds = function (numberObject) {
  return new Array(numberObject).fill('').map((__, index) => createAd(index));
};
