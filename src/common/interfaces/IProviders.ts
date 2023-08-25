import { IProvider } from "./IProvider";

export interface IProviders {
  link: string;
  flatrate: IProvider[];
  rent: IProvider[];
  buy: IProvider[];
}
