import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIConcierge from "@/components/AIConcierge";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Toaster } from "react-hot-toast";
import SchemaMarkup from "@/components/SchemaMarkup";
import { AudioProvider } from "@/components/AudioProvider";
import { BookingProvider } from "@/components/BookingProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import CurrencyConverter from "@/components/CurrencyConverter";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://ahlanandaman.in'),
  title: "Ahlan Homestays | Premium Gold Category Homestay in Port Blair",
  description:
    "Ahlan Homestays | Premium Gold Category Homestay in Port Blair. Experience premium luxury homestay in Port Blair, Andaman. Spacious 300+ sq ft AC rooms, hotel-grade comfort, island packages & personalized hospitality.",
  applicationName: 'Ahlan Homestays',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico?v=20' },
      { url: '/favicon.png?v=20', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg?v=20', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=20', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "Andaman homestay",
    "best homestay in Andaman",
    "Port Blair homestay",
    "luxury homestay Andaman",
    "homestay near Cellular Jail",
    "affordable deluxe stay Port Blair",
    "family homestay Andaman",
    "honeymoon homestay Andaman",
    "premium rooms Port Blair",
    "Andaman island stay",
    "ahlanandaman.in",
    "Ahlan Homestays",
    "Gold category homestay Andaman",
  ].join(", "),
  authors: [{ name: "Ahlan Homestays" }],
  creator: "Ahlan Homestays",
  publisher: "Ahlan Homestays",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ahlanandaman.in",
    siteName: "Ahlan Homestays",
    title: "Ahlan Homestays | Premium Gold Category Homestay in Port Blair",
    description:
      "Ahlan Homestays | Premium Gold Category Homestay in Port Blair. Spacious 300+ sq ft deluxe rooms, curated island packages & world-class hospitality.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ahlanandaman.in - Luxury Homestay Andaman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahlan Homestays | Premium Gold Category Homestay in Port Blair",
    description: "Ahlan Homestays | Premium Gold Category Homestay in Port Blair. Hotel comfort with homely warmth.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ahlanandaman.in",
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        
        {/* Removed redundant link tags — Next.js metadata handles icons now */}
        
        {/* Exact Site Name Branding Signals */}
        <meta property="og:site_name" content="Ahlan Homestays" />
        <meta name="application-name" content="Ahlan Homestays" />
        <meta name="apple-mobile-web-app-title" content="Ahlan Homestays" />
        
        <meta name="geo.region" content="IN-AN" />
        <meta name="geo.placename" content="Port Blair, Andaman and Nicobar Islands" />
        <meta name="geo.position" content="11.6234;92.7265" />
        <meta name="ICBM" content="11.6234, 92.7265" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SchemaMarkup />
          {/* Hidden Google Translate Element to prevent bottom-left bug */}
          <div id="google_translate_element" style={{ display: "none" }} />
          <Script
            id="google-translate-script"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { 
                    pageLanguage: "en", 
                    includedLanguages: "en,hi,ta,ml,te,kn,bn,mr,ar,fr,de,ru,ja,es,it", 
                    autoDisplay: false 
                  },
                  "google_translate_element"
                );
              }
            `}
          </Script>
          <style dangerouslySetInnerHTML={{ __html: `
            /* Suppress ALL Google Translate UI artifacts */
            .goog-te-banner-frame,
            .goog-te-balloon-frame,
            .goog-te-gadget-icon,
            .goog-te-gadget-simple img,
            .goog-te-menu-value span:nth-child(3),
            .goog-te-combo,
            .goog-logo-link,
            .goog-te-gadget { display: none !important; visibility: hidden !important; }
            body { top: 0px !important; }
            /* Fully hide the translate container — prevents bottom-left ghost element */
            #google_translate_element {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
              position: absolute !important;
              top: -9999px !important;
              left: -9999px !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
            }
            .skiptranslate {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
            /* Hide the iframe Google Translate injects */
            iframe.goog-te-menu-frame,
            iframe.skiptranslate {
              display: none !important;
              visibility: hidden !important;
            }
          ` }} />

          <AudioProvider>
            <CurrencyProvider>
              <BookingProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <WhatsAppButton />
                <AIConcierge />
                <ExitIntentPopup />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "#0D3D52",
                      color: "#E8C96D",
                      border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: "12px",
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
                <CurrencyConverter />
              </BookingProvider>
            </CurrencyProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
