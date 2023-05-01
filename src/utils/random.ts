export const pickRandom = <T>(elements: T[]) => {
  return elements[Math.floor(Math.random() * elements.length)];
};
