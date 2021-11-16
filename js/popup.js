const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPE_NAME = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

export const createCardNotice = ({offer, author}) => {
  const noticeElement = cardTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  noticeElement.querySelector('.popup__type').textContent = TYPE_NAME[offer.type];
  noticeElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  noticeElement.querySelector('.popup__features').innerHTML = '';
  if (offer.features) {
    noticeElement.querySelector('.popup__features').innerHTML = offer.features.map((feature) => (
      `<li class="popup__feature popup__feature--${feature}"></li>`
    )).join('');
  }
  noticeElement.querySelector('.popup__description').textContent = offer.description;
  noticeElement.querySelector('.popup__photos').innerHTML = '';
  if (offer.photos) {
    noticeElement.querySelector('.popup__photos').innerHTML = offer.photos.map((photo) => (
      `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`
    )).join('');
  }
  noticeElement.querySelector('.popup__avatar').src = author.avatar;

  return noticeElement;
};
