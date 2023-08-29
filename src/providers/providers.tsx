"use client";

import { IChildren } from "@/common/interfaces/ichildren";
import QueryProvider from "./query-provider";
import MuiProviders from "./mui-provider";

import "../localization/i18n";

export default function Providers(props: IChildren) {
  return (
    <QueryProvider>
      <MuiProviders>{props.children}</MuiProviders>
    </QueryProvider>
  );
}
