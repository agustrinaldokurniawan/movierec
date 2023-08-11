import rgbHex from "rgb-hex";

export const convertHexToRgb = (hex: number[]) => {
  return rgbHex(hex.join(","));
};
