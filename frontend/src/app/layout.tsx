import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mkhedmin.ma - Trouvez des freelancers marocains instantanément",
  description: "Plateforme marocaine pour trouver des freelancers digitaux qualifiés. Développeurs, designers, marketeurs et plus encore.",
  keywords: "freelance maroc, freelancer marocain, développeur maroc, designer maroc, marketing digital maroc",
  authors: [{ name: "Mkhedmin.ma" }],
  creator: "Mkhedmin.ma",
  publisher: "Mkhedmin.ma",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://mkhedmin.ma",
    title: "Mkhedmin.ma - Freelancers Marocains",
    description: "Trouvez des freelancers marocains qualifiés pour vos projets digitaux",
    siteName: "Mkhedmin.ma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mkhedmin.ma - Freelancers Marocains",
    description: "Trouvez des freelancers marocains qualifiés pour vos projets digitaux",
  },
  alternates: {
    canonical: "https://mkhedmin.ma",
    languages: {
      'fr-MA': 'https://mkhedmin.ma',
      'ar-MA': 'https://mkhedmin.ma/ar',
      'en-MA': 'https://mkhedmin.ma/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
      <body className="font-inter antialiased bg-gray-50 text-gray-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
