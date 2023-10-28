import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "./_providers/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "five-thirty-one",
  description: "lift heavy things",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
