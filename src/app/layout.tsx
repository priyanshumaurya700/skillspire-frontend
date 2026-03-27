import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { AuthModalProvider } from "./context/AuthModalContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkillSpire | Empowering Your Learning Journey",
  description: "SkillSpire is your trusted partner in digital learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthModalProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthModalProvider>
      </body>
    </html>
  );
}
