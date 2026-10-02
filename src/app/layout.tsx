import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SiteDataProvider } from "@/site/SiteDataProvider";

// Runs before hydration so the correct theme is set pre-paint (no flash of
// the wrong theme). Kept inline — it must execute synchronously in <head>.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("kwaya-theme");
    // Light is the site's default look. A visitor who has actually chosen a
    // theme keeps that choice; the OS setting is deliberately NOT followed,
    // so someone whose device is in dark mode still lands on the light
    // design rather than a dark page they never asked for.
    var theme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kwaya ya Mt. Stefano Shahidi | Parokia ya Kipawa",
  description:
    "Kwaya ya Mt. Stefano Shahidi (SSK) - Parokia ya Kipawa, Jimbo Kuu la Dar es Salaam. Tunaimba kwa Utukufu wa Mungu tangu 1975.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-content">
        <ThemeProvider>
          <LanguageProvider>
            <SiteDataProvider>{children}</SiteDataProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
