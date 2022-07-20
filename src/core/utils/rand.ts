export const generateId = (): number => Math.floor(Math.random() * 10000);

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));
