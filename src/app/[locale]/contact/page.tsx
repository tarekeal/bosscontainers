import { getLocaleAndDict } from "@/lib/i18n";
import { ContactContent } from "@/components/contact-content";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

const BASE_URL = "https://www.bosscontainers.be";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(rawLocale);
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription,
    alternates: {
      canonical: `${BASE_URL}/${validLocale}/contact`,
      languages: {
        fr: `${BASE_URL}/fr/contact`,
        nl: `${BASE_URL}/nl/contact`,
        en: `${BASE_URL}/en/contact`,
        "x-default": `${BASE_URL}/fr/contact`,
      },
    },
    openGraph: {
      title: dict.meta.contactTitle,
      description: dict.meta.contactDescription,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(locale);

  return (
    <>
      <BreadcrumbJsonLd
        locale={validLocale}
        items={[
          { name: dict.nav.home, href: `/${validLocale}` },
          { name: dict.nav.contact, href: `/${validLocale}/contact` },
        ]}
      />
      <ContactContent dict={dict} locale={validLocale} />
    </>
  );
}
