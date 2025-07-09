import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import CombineProvider from "@/providers/CombineProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Kaydi Green Project",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased`}
      >
        <CombineProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </CombineProvider>
      </body>
    </html>
  );
}
