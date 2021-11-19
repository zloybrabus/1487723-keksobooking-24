
import {closeMessage, createMessageError} from './message.js';

import {renderMarkers} from './map.js';
import {setMapFilters, MAX_COUNT_MARKERS} from './filters.js';
import {removeBlockFiltersForm} from './filters.js';
import {returnDefaultData} from './form.js';

const URL_SERVER = 'https://24.javascript.pages.academy/keksobooking';

export const getData = () => {
  fetch(`${URL_SERVER}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(createMessageError());
    })
    .then((response) => response.json())
    .then((notices) => {
      renderMarkers(notices.slice(0, MAX_COUNT_MARKERS));
      setMapFilters(notices);
      returnDefaultData(notices);
      removeBlockFiltersForm();
    });
};

export const sendData = (onSuccess, onError, body) => {

  fetch(URL_SERVER, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        closeMessage(document.querySelector('.success'));
      } else {
        onError();
        closeMessage(document.querySelector('.error'));
      }
    })
    .catch(() => {
      onError();
      closeMessage(document.querySelector('.error'));
    });
};
