import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hi",
  weight: ["400", "500", "600", "700", "800"],
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bn",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Saarthi AI - Your Digital Civic Companion",
  description: "An AI-powered civic companion for Indian citizens to explore schemes, check documents, and file local issues seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${devanagari.variable} ${bengali.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <div className="flex-1 flex flex-col pt-16">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
