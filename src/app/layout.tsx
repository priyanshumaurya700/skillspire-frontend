'use client'
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

// Import Poppins with custom variable
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add weights as needed
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "SkillSpire | Empowering Your Learning Journey",
//   description: "SkillSpire is your trusted partner in digital learning, offering a wide range of courses to help you discover endless learning paths.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname =usePathname();

  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {!isDashboardRoute && <Navbar />}
        {children}
        {!isDashboardRoute && <Footer />}
      </body>
    </html>
  );
}
