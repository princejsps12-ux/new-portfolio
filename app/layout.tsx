import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/data";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  keywords: [
    "Prince Pandey",
    "Software Developer",
    "Full-Stack",
    "Backend",
    "AI Agent Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "Software Internship",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Software Developer`,
    description: site.summary,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Developer`,
    description: site.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090C11",
  width: "device-width",
  initialScale: 1,
};

// Set theme before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;if(t==='light'||(!t&&m)){document.documentElement.classList.add('light')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
