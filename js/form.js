import {sendData} from './api.js';
import {returnMapPinStarting, renderMarkers, clearMarkers} from './map.js';
import {removeAvatarFoto} from './avatar.js';
import {resetMapFilterForm, MAX_COUNT_MARKERS} from './filters.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_NUMBER_ROOMS = 100;
const MIN_NUMBER_CAPACITY = 0;

const formNotice = document.querySelector('.ad-form');
const allFieldset = Array.from(formNotice.getElementsByTagName('fieldset'));
const noticeTitleInput = formNotice.querySelector('#title');
const quantityRoom = formNotice.querySelector('#room_number');
const quantityCapacity = formNotice.querySelector('#capacity');
const typeHabitation = formNotice.querySelector('#type');
const priceInput = formNotice.querySelector('#price');
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');
const resetButton = formNotice.querySelector('.ad-form__reset');

const addBlockForm = () => {
  formNotice.classList.add('ad-form--disabled');
  allFieldset.forEach((element) => {
    element.disabled = true;
  });
};
addBlockForm();

export const removeBlockForm = () => {
  formNotice.classList.remove('ad-form--disabled');
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

const changeRoomCapacity = () => {
  const numberRooms = +quantityRoom.value;
  const numberCapacity = +quantityCapacity.value;
  quantityCapacity.style.boxShadow = '0 2px 4px 4px #ff0303';
  if (numberRooms < numberCapacity) {
    quantityCapacity.setCustomValidity('Значение превышает кол-во комнат');
  } else if (numberRooms === MAX_NUMBER_ROOMS && numberCapacity !== MIN_NUMBER_CAPACITY) {
    quantityCapacity.setCustomValidity('100 комнат только "не для гостей"');
  } else if (numberRooms !== MAX_NUMBER_ROOMS && numberCapacity === MIN_NUMBER_CAPACITY) {
    quantityCapacity.setCustomValidity('"не для гостей" только для 100 комнат');
  } else {
    quantityCapacity.setCustomValidity('');
    quantityCapacity.style.boxShadow = '';
  }
  quantityCapacity.reportValidity();
};

quantityRoom.addEventListener('change', (evt) => {
  changeRoomCapacity();
  const choosenValue = (evt.target.value === '100') ? '0' : evt.target.value;
  const valueCapacity = Array.from(quantityCapacity);
  valueCapacity.forEach((element) => {
    element.disabled = true;
    if (element.value === choosenValue) {
      element.disabled = false;
    }
    if (element.value <= choosenValue && element.value > 0) {
      element.disabled = false;
    }
  });
});

quantityCapacity.addEventListener('change', changeRoomCapacity);

typeHabitation.addEventListener('change', (evt) => {
  const minPrice = MinPrice[evt.target.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice.toString();
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

export const clearDefaultForms = (offers) => {
  resetMapFilterForm();
  clearMarkers();
  renderMarkers(offers.slice(0, MAX_COUNT_MARKERS));
};

let defaultData;
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formNotice.reset();
  returnMapPinStarting();
  removeAvatarFoto();
  priceInput.placeholder = MinPrice.flat;
  clearDefaultForms(defaultData);
});

export const returnDefaultData = (data) => {
  defaultData = data;
};

export const setFormSubmit = (onSuccess, onError) => {
  formNotice.addEventListener('submit', (evt) => {
    evt.preventDefault();
    clearDefaultForms(defaultData);

    sendData(
      () => onSuccess(evt.target.reset(), returnMapPinStarting()),
      () => onError(),
      new FormData(evt.target),
      resetMapFilterForm(),
      priceInput.placeholder = MinPrice.flat,
    );
  });
};
