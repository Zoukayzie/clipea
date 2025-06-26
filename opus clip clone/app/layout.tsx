import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Clipea - Créez des clips viraux avec l'IA",
  description: "Transformez automatiquement vos vidéos longues en clips courts optimisés pour TikTok, Instagram Reels et YouTube Shorts avec l'IA avancée.",
  keywords: [
    "clip generation",
    "video editing",
    "AI video",
    "TikTok clips",
    "Instagram Reels",
    "YouTube Shorts",
    "video processing",
    "whisper",
    "gpt-4",
    "nextjs",
    "vercel",
    "clipea"
  ],
  authors: [{ name: "Clipea Team" }],
  creator: "Clipea",
  publisher: "Clipea",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://clipea.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clipea - Créez des clips viraux avec l'IA",
    description: "Transformez automatiquement vos vidéos longues en clips courts optimisés pour les réseaux sociaux avec l'IA avancée.",
    url: "https://clipea.vercel.app",
    siteName: "Clipea",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clipea - Interface de génération de clips",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipea - Créez des clips viraux avec l'IA",
    description: "Transformez automatiquement vos vidéos longues en clips courts optimisés pour les réseaux sociaux.",
    images: ["/og-image.png"],
    creator: "@clipea_app",
  },
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
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
