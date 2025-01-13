/**
 * Generates a random integer between the specified min and max values, inclusive.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min and max.
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Converts an RGB array to a HEX color string.
 * @param rgb - An array of three numbers representing the RGB color [R, G, B].
 * @returns A HEX color string in the format "#RRGGBB".
 */
export const rgbToHex = (rgb: [number, number, number]): string => {
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};