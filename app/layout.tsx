import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Montserrat, Anton, Tektur} from "next/font/google"
import { TrackingProvider } from "./context/tracking-context"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"



const anton = Tektur({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-anton" })
const montserrat =Tektur({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-montserrat" })
const chango = Tektur({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-chango" })



const siteConfig = {
  name: "Alpacabet",
  title: "Alpacabet",
  description: "Alpacabet: apuestas deportivas, casino, en vivo y más. ¡Regístrate y gana!",
  url: "https://alpacabet.co",
  ogImage: "https://whitewallets.s3.amazonaws.com/alpacabet/commons/logo-solo-removebg-prevssssssssssssssssssiew1703686331.png",
  favicon: "https://whitewallets.s3.amazonaws.com/alpacabet/commons/logo-solo-removebg-prevssssssssssssssssssiew1703686331.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  
  // Favicons y icons
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },

  // Open Graph
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Operado por Alpacabet",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  
  // Otros metadatos útiles
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${anton.variable} ${montserrat.variable} ${chango.variable}`}> {/* Puedes quitar className=\"dark\" si ThemeProvider lo maneja o si prefieres tema claro por defecto */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      {/* Aplicamos la clase de Montserrat al body */}
      <body className={montserrat.className}> 
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
              );
              fbq("init", "${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
              fbq("track", "PageView");
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TrackingProvider>
            {children}
          </TrackingProvider>
        </ThemeProvider>
        </body>
      </html>
  )
}
