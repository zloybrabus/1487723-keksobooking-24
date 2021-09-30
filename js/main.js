const getRandomInt = function (min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(1, 3);

const getRandomFloat = function (min, max, digit) {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }

  return ((Math.random() * (max - min)) + min).toFixed(digit);
};

getRandomFloat(2.1, 3.9, 1);

