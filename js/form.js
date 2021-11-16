import {sendData} from './api.js';
import {returnMapPinStarting} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};


const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const allFieldset = Array.from(formNotice.getElementsByTagName('fieldset'));
const noticeTitleInput = formNotice.querySelector('#title');
const quantityRoom = formNotice.querySelector('#room_number');
const quantityCapacity = formNotice.querySelector('#capacity');
const typeHabitation = formNotice.querySelector('#type');
const priceInput = formNotice.querySelector('#price');
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');
const resetButton = formNotice.querySelector('.ad-form__reset');

formNotice.querySelector('#address').setAttribute('readonly', 'readonly');

const addBlockForm = () => {
  formNotice.classList.add('ad-form--disabled');
  formFilters.classList.add('map__filters--disabled');
  allFieldset.forEach((element) => {
    element.disabled = true;
  });
};
addBlockForm();

export const removeBlockForm = () => {
  formNotice.classList.remove('ad-form--disabled');
  formFilters.classList.remove('map__filters--disabled');
  allFieldset.forEach((element) => {
    element.disabled = false;
  });
};

noticeTitleInput.addEventListener('input', () => {
  const valueLength = noticeTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    noticeTitleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    noticeTitleInput.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    noticeTitleInput.setCustomValidity('');
  }

  noticeTitleInput.reportValidity();
});

quantityRoom.addEventListener('change', (evt) => {
  const choosenValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < quantityCapacity.length; i++) {
    quantityCapacity[i].disabled = true;
    if (quantityCapacity[i].value === choosenValue) {
      quantityCapacity[i].disabled = false;
    }
    if (quantityCapacity[i].value <= choosenValue && quantityCapacity[i].value > 0) {
      quantityCapacity[i].disabled = false;
    }
  }
});

typeHabitation.addEventListener('change', (evt) => {
  const minPrice = MIN_PRICE[evt.target.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice.toString();
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});


export const setFormSubmit = (onSuccess, onError) => {
  formNotice.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(
      () => onSuccess(evt.target.reset(), returnMapPinStarting()),
      () => onError(),
      formData,
    );
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnMapPinStarting();
});
