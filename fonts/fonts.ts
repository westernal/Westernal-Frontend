import { Megrim, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  variable: "--font-main",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const megrim = Megrim({
  variable: "--font-logo",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
