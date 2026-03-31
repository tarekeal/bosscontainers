import { getLocaleAndDict } from "@/lib/i18n";
import { PricingTable } from "@/components/sections/pricing-table";
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
    title: dict.meta.pricingTitle,
    description: dict.meta.pricingDescription,
    alternates: {
      canonical: `${BASE_URL}/${validLocale}/pricing`,
      languages: {
        fr: `${BASE_URL}/fr/pricing`,
        nl: `${BASE_URL}/nl/pricing`,
        en: `${BASE_URL}/en/pricing`,
        "x-default": `${BASE_URL}/fr/pricing`,
      },
    },
    openGraph: {
      title: dict.meta.pricingTitle,
      description: dict.meta.pricingDescription,
    },
  };
}

export default async function PricingPage({
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
          { name: dict.nav.pricing, href: `/${validLocale}/pricing` },
        ]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.pricing.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.pricing.subtitle}
            </p>
          </div>
          <PricingTable locale={validLocale} dict={dict} />
        </div>
      </section>
    </>
  );
}
