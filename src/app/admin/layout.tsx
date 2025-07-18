import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "../globals.css";

import CombineProvider from "@/providers/CombineProviders";
import AdminProtectedLayout from "@/providers/AdminProtectedLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppins.variable} ${josefin.variable} antialiased`}>
      <CombineProvider>
        <AdminProtectedLayout>
          <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </AdminProtectedLayout>
      </CombineProvider>
    </div>
  );
}
