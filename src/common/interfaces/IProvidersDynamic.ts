import { IProviders } from "./IProviders";

export interface IProvidersDynamic {
  [key: string]: IProviders;
}
