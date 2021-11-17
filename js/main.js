import {showMessageSuccess, showMessageError} from './message.js';
import {setFormSubmit} from './form.js';
import {loadAvatar, loadFotoLodging} from './avatar.js';

setFormSubmit(showMessageSuccess, showMessageError);
loadAvatar();
loadFotoLodging();
