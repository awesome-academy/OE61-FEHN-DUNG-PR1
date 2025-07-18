import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "../globals.css";

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
    title: "Green Project",
    description: "Green Project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${poppins.variable} ${josefin.variable} antialiased`}>
            <CombineProvider>
                {children}
            </CombineProvider>
        </div>
    );
}
