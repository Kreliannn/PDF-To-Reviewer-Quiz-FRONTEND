"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const client = new QueryClient()

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={client}>
        {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
