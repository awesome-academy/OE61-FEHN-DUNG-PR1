import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";


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
    description: "Root Layout",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${josefin.variable} antialiased`}
            >
                {children}
                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}
