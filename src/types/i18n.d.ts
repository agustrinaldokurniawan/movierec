import { resources } from "../localization/resources";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources.en;
  }
}
