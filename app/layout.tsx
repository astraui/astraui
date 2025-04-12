import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Inter } from 'next/font/google'
import Header from '@/components/project/fundamentals/Header'
import Footer from '@/components/project/fundamentals/Footer'
import LayoutWrapper from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from 'next/head'

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Initialize Geist font (for headings)
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

// Initialize Geist Mono (for code blocks)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

async function getProduct() {
  return {
    name: "Astra UI: Design faster, build smarter, shine brighter.",
    image: "/og-links.jpg",
    description:
      "Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data needed for metadata

  return {
    title: {
      default: "Astra UI: Design faster, build smarter, shine brighter.",
      template: "%s | Astra UI",
    },
    description:
      "Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!",
    metadataBase: new URL("https://www.astraui.me/"),
    authors: [{ name: "Ege Uysal" }],
    keywords: ["React UI library", "React component library", "Astra UI components", "Astra UI React", "React design system", "UI components for React", "Astra UI kit", "React UI toolkit", "modern React components", "lightweight React UI library", "customizable React components", "open source React UI library", "Astra UI framework", "React material design alternative", "Astra UI theme", "fast React UI library", "minimal React UI kit", "best React UI library", "Astra React components", "Astra UI system", "intuitive React UI", "Astra UI documentation", "React UI components open source", "Astra design system", "enterprise React UI library"],
    openGraph: {
      title: "Astra UI: Design faster, build smarter, shine brighter.",
      description:
        "Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!",
      url: "https://www.astraui.me/",
      images: [
        {
          url: "/og-links.jpg",
          width: 1200,
          height: 630,
          alt: "Astra UI Logo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: "Astra UI: Design faster, build smarter, shine brighter.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@astraui",
      title: "Astra UI: Design faster, build smarter, shine brighter.",
      description:
        "Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!",
      images: ["/og-links.jpg"],
      creator: "@astraui",
    },
    icons: {
      icon: [
        { url: "/icon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/icon.ico",
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.astraui.me/",
    },
    applicationName: "Astra UI",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
    other: {
      appleMobileWebAppCapable: "yes",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getProduct();

  const currentDate = "2025-04-11 21:45:05";
  const priceValidUntilDate = "2026-04-11";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    url: "https://www.astraui.me/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.astraui.me/",
      priceValidUntil: priceValidUntilDate,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: "0",
            maxValue: "0",
            unitCode: "HUR",
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    merchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    creator: {
      "@type": "Person",
      name: "Ege Uysal",
      jobTitle: "Creative Professional",
      worksFor: {
        "@type": "Organization",
        name: "Self-employed",
      },
    },
    sameAs: [
      "https://twitter.com/egecreates",
      "https://www.linkedin.com/in/egeuysal",
      "https://www.instagram.com/egeuysalo",
    ],
    dateModified: currentDate,
  };

  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable} pb-18`}>
      <Head>
        <meta
          property="og:title"
          content="Astra UI: Design faster, build smarter, shine brighter."
        />
        <meta
          property="og:description"
          content="Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!"
        />
        <meta
          property="og:image"
          content="/og-links.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content={currentDate} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </Head>
      <body className="w-full h-full flex-center">
        <LayoutWrapper>
        <main className="w-[90vw] md:w-[92.5vw] lg:w-[95vw]">
          <div className="mb-32">
            <Header />
          </div>
          <Analytics />
          {children}
          <SpeedInsights />
          <aside className="w-full flex-center mt-24">
            <Footer />
          </aside>
        </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
