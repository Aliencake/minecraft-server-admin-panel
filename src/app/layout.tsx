import { type Metadata } from "next";
import { Roboto } from "next/font/google";

import Providers from "@/components/providers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-roboto antialiased",
          roboto.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
      <Toaster richColors />
    </html>
  );
}
