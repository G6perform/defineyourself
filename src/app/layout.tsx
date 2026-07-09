import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Define Yourself Inc. | Empowering Youth Through Athletics",
  description:
    "Define Yourself Inc. is a non-profit dedicated to empowering youth to achieve their fullest potential through holistic development via sports participation and mentorship programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
