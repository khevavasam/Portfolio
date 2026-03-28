import type { Metadata } from "next";
import "@/lightswind.css";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Khevavasam Artur — Frontend React Developer",
  description: "Portfolio / CV: projects, experience, contacts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
