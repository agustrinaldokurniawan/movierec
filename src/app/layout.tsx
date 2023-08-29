import { IChildren } from "@/common/interfaces/ichildren";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Chamber",
  description: "Movie Chamber",
};

export default function RootLayout(props: IChildren) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
