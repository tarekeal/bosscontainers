import type { Metadata } from "next";
import { getLocaleAndDict } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Environment } from "@/components/sections/environment";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { ServiceJsonLd, FaqJsonLd } from "@/components/json-ld";

const BASE_URL = "https://www.bosscontainers.be";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(rawLocale);
  return {
    title: dict.meta.title,
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
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: validLocale, dict } = await getLocaleAndDict(locale);

  return (
    <>
      <ServiceJsonLd locale={validLocale} />
      <FaqJsonLd items={dict.faq.items} />
      <Hero locale={validLocale} dict={dict} />
      <Testimonials dict={dict} />
      <Services dict={dict} />
      <HowItWorks dict={dict} />
      <Environment dict={dict} />
      <FAQ dict={dict} />
      <CTA locale={validLocale} dict={dict} />
    </>
  );
}
