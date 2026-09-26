import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "TRYWORK",
  description: "El trabajo que necesitas, cuando lo necesitas",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF8A00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className={`${plusJakarta.className} min-h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
