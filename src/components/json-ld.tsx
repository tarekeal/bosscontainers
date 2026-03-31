import { COMPANY } from "@/lib/data";

const BASE_URL = "https://www.bosscontainers.be";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders JSON-LD structured data as a script tag.
 * The data parameter must only contain trusted, application-controlled values.
 * Never pass user-generated content directly.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: COMPANY.name,
    url: BASE_URL,
    image: `${BASE_URL}/images/container-hero.svg`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    priceRange: "\u20AC350-\u20AC1200",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Westvaartdijk 95",
      addressLocality: "Grimbergen",
      postalCode: "1850",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.9342,
      longitude: 4.3716,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:30",
        closes: "16:30",
      },
    ],
    sameAs: [COMPANY.social.facebook],
    inLanguage: locale,
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  locale: string;
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}

export function FaqJsonLd({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Container Rental",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: COMPANY.name,
    },
    areaServed: {
      "@type": "Place",
      name: "Brussels, Belgium",
    },
    description:
      locale === "fr"
        ? "Location de conteneurs de 8 \u00E0 30m\u00B3 pour construction, r\u00E9novation, d\u00E9chets verts et plus."
        : locale === "nl"
          ? "Containerverhuur van 8 tot 30m\u00B3 voor bouw, renovatie, groenafval en meer."
          : "Container rental from 8 to 30m\u00B3 for construction, renovation, green waste and more.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "350",
      highPrice: "1200",
      priceCurrency: "EUR",
    },
    inLanguage: locale,
  };

  return <JsonLd data={data} />;
}
