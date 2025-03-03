export const isNotEmpty = (text) => {
  return text.trim().length !== 0;
};

export const isInRange = (text, min = 1, max = 300) => {
  return text.trim().length >= min && text.trim().length <= max;
};
