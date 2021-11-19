import {renderMarkers, clearMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = Array.from(mapFiltersForm.children);
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');

const HousingPrice = {
  low: 10000,
  middle: 50000,
};

const HousingPriceName = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};

export const MAX_COUNT_MARKERS = 10;

const addBlockFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.disabled = true;
  });
};
addBlockFiltersForm();

export const removeBlockFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.disabled = false;
  });
};

const selectHousingType = (item) => item.offer.type === housingType.value || housingType.value === 'any';

const selectHousingPrice = (item) => housingPrice.value === 'any'
  || item.offer.price < HousingPrice.low && housingPrice.value === HousingPriceName.low
  || item.offer.price >= HousingPrice.low && item.offer.price < HousingPriceName.high && housingPrice.value === HousingPriceName.middle
  || item.offer.price >=  HousingPrice.high && housingPrice.value === HousingPriceName.high;

const selectHousingRooms = (item) => item.offer.rooms === +housingRooms.value || housingRooms.value === 'any';

const selectHousingGuests = (item) => item.offer.guests === +housingGuests.value || housingGuests.value === 'any';

const selectHousingFeatures = (item) => {
  const housingFeatures = Array.from(mapFiltersForm.querySelectorAll('.map__checkbox:checked'));
  const housingFeaturesValue = housingFeatures.map((it) => it.value);
  if (!item.offer.features) {
    return false;
  }
  return housingFeaturesValue.every((value) => item.offer.features.includes(value));
};

export const setMapFilters = (offer) => {
  mapFiltersForm.addEventListener('change', debounce(() => {
    const selectOffers = offer.filter((item) =>
      selectHousingType(item)
      && selectHousingPrice(item)
      && selectHousingRooms(item)
      && selectHousingGuests(item)
      && selectHousingFeatures(item));
    clearMarkers();
    renderMarkers(selectOffers.slice(0, MAX_COUNT_MARKERS));
  },
  ));
};

export const resetMapFilterForm = () => {
  mapFiltersForm.reset();
};
