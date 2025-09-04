import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChangeNameButton from "./components/ChangeNameButton";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AS Ambarès Tennis de Table",
  description: "Calendrier des présences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`bg-white text-black min-h-screen ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className="mx-auto max-w-6xl p-4">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl text-[#EB212E] font-bold">
              AS Ambarès Tennis de Table
            </h1>
            <ChangeNameButton />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
