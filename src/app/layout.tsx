import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quilin Jeans",
  description: "Fábrica directa de jeans y mayoristas. Diseños exclusivos y calidad insuperable.",
  openGraph: {
    title: "Quilin Jeans | Arte y Estilo",
    description: "Fábrica directa de jeans y mayoristas. Diseños exclusivos y calidad insuperable.",
    images: [
      {
        url: "/logo-unicorn.jpg",
        width: 800,
        height: 800,
        alt: "Quilin Jeans Logo",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/logo-unicorn.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
