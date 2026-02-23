import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khevavasam Artur — Frontend React Developer",
  description: "Portfolio / CV: projects, experience, contacts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
