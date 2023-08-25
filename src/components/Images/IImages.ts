import { IImage } from "../../common/interfaces/IImage";

export interface IImages {
  width?: number | string;
  height?: number | string;
  direction?: "vertical" | "horizontal";
  images?: IImage[];
}
