import {renderMarkers} from './map.js';
import {getData} from './api.js';

import {showMessageSuccess} from './message.js';
import {showMessageError} from './message.js';
import {setFormSubmit} from './form.js';

const NOTICE_COUNT = 10;
getData((notices) => {
  renderMarkers(notices.slice(0, NOTICE_COUNT));
});

setFormSubmit(showMessageSuccess, showMessageError);
