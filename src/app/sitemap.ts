import type { MetadataRoute } from "next";

const BASE_URL = "https://www.bosscontainers.be";
const locales = ["fr", "nl", "en"] as const;

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/book", priority: 0.9 },
  { path: "/pricing", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`]),
        ),
      },
    })),
  );
}
