import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Crimson_Pro } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/data/site";
import "./globals.css";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.univamex.com"),
  title: {
    default: "UNIVAMEX | Oferta académica e inscripciones",
    template: "%s | UNIVAMEX",
  },
  description:
    "Encuentra bachilleratos, licenciaturas y posgrados en UNIVAMEX. Revisa requisitos y solicita informes para iniciar tu proceso.",
  openGraph: {
    title: "UNIVAMEX",
    description:
      "Oferta académica moderna con programas de bachillerato, licenciatura, maestría y doctorado.",
    siteName: siteConfig.name,
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${crimson.variable} ${atkinson.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}



