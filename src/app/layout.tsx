import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Slack Clone",
  description: "Created by Tanisha",
};

export const revalidate=0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
