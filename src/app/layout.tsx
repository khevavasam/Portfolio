import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./globals.css";

export const metadata: Metadata = {
  title: "Khevavasam Artur — Frontend React Developer",
  description: "Portfolio / CV: projects, experience, contacts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* темная тема бустрапа */}
      <body data-bs-theme="dark">{children}</body>
    </html>
  );
}
