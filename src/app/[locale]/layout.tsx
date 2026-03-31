import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { getLocaleAndDict } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LocalBusinessJsonLd } from "@/components/json-ld";

const BASE_URL = "https://www.bosscontainers.be";

const OG_LOCALE_MAP: Record<string, string> = {
  fr: "fr_BE",
  nl: "nl_BE",
  en: "en_GB",
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(rawLocale);
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.title.split("|")[0]?.trim() || "Boss Containers"}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `${BASE_URL}/${validLocale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        nl: `${BASE_URL}/nl`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
    manifest: "/manifest.json",
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: OG_LOCALE_MAP[validLocale] || "fr_BE",
      url: `${BASE_URL}/${validLocale}`,
      siteName: "Boss Containers",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "nl" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(rawLocale);

  return (
    <html
      lang={validLocale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LocalBusinessJsonLd locale={validLocale} />
          <Nav locale={validLocale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer locale={validLocale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
