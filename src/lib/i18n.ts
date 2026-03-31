export const locales = ["fr", "nl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("@/dictionaries/fr").then((m) => m.default),
  nl: () => import("@/dictionaries/nl").then((m) => m.default),
  en: () => import("@/dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeNames: Record<Locale, string> = {
  fr: "Fran\u00E7ais",
  nl: "Nederlands",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
};

export const localeDateFormats: Record<Locale, string> = {
  fr: "fr-BE",
  nl: "nl-BE",
  en: "en-GB",
};

export async function getLocaleAndDict(rawLocale: string) {
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return { locale, dict };
}
