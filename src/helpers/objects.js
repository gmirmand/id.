export const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
