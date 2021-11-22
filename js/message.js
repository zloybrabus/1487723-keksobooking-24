import {removeAvatarFoto} from './avatar.js';
import {resetMapFilterForm} from './filters.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const closeButton = errorTemplate.querySelector('.error__button');
const errorLoadServerTemplate = document.querySelector('#error-load-server').content.querySelector('.error-load-server');

const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';


export const closeMessage = (modal) => {
  const removeMessage = () => {
    modal.remove();
    document.removeEventListener('keydown', onEscKeydown);
    window.removeEventListener('click', onModalClick);
  };
  function onEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
      removeAvatarFoto();
      resetMapFilterForm();
    }
  }
  function onModalClick () {
    removeMessage();
    removeAvatarFoto();
    resetMapFilterForm();
  }
  document.addEventListener('keydown', onEscKeydown);
  window.addEventListener('click', onModalClick);
};


export const showMessageSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
};


export const showMessageError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
};


closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeMessage();
});


export const createMessageError = () => {
  const body = document.querySelector('body');
  const messageContainer = errorLoadServerTemplate.cloneNode(true);
  body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, ALERT_SHOW_TIME);
};
