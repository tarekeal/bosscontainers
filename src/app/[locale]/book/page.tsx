import { getLocaleAndDict } from "@/lib/i18n";
import { BookingWizard } from "@/components/booking-wizard";
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
    title: dict.meta.bookTitle,
    description: dict.meta.bookDescription,
    alternates: {
      canonical: `${BASE_URL}/${validLocale}/book`,
      languages: {
        fr: `${BASE_URL}/fr/book`,
        nl: `${BASE_URL}/nl/book`,
        en: `${BASE_URL}/en/book`,
        "x-default": `${BASE_URL}/fr/book`,
      },
    },
    openGraph: {
      title: dict.meta.bookTitle,
      description: dict.meta.bookDescription,
    },
  };
}

export default async function BookPage({
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
          { name: dict.nav.book, href: `/${validLocale}/book` },
        ]}
      />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">{dict.booking.title}</h1>
          <BookingWizard locale={validLocale} dict={dict} />
        </div>
      </section>
    </>
  );
}
