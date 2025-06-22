import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StartHub - Connect, Innovate, Launch",
  description: "Join our community of entrepreneurs, showcase your startup, and connect with innovators around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased dark:bg-black`}
      >
        {children}
      </body>
    </html>
  );
}