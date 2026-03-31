"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { WASTE_CATEGORIES } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const POPULAR_SIZE = 12;

interface PricingTableProps {
  locale: Locale;
  dict: Dictionary;
}

export function PricingTable({ locale, dict }: PricingTableProps) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--section-padding-y-sm)",
        paddingBottom: "var(--section-padding-y-sm)",
      }}
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />

      <div
        className="relative mx-auto px-6"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            {dict.pricing.title}
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {dict.pricing.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {dict.pricing.subtitle}
          </p>
        </div>

        {/* Tabbed pricing */}
        <Tabs defaultValue="mixed" className="w-full">
          <TabsList className="mb-8 flex h-auto flex-wrap gap-2 bg-transparent p-0">
            {WASTE_CATEGORIES.map((category) => {
              const catDict =
                dict.services.categories[
                  category.id as keyof typeof dict.services.categories
                ];
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  style={{
                    transitionDuration: "var(--duration-micro)",
                    transitionTimingFunction: "var(--ease-default)",
                  }}
                >
                  <span aria-hidden="true">{category.icon}</span>
                  {catDict.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {WASTE_CATEGORIES.map((category) => {
            const catDict =
              dict.services.categories[
                category.id as keyof typeof dict.services.categories
              ];
            return (
              <TabsContent key={category.id} value={category.id}>
                {/* Category description */}
                <p className="mb-6 text-muted-foreground">
                  {catDict.description}
                </p>

                {/* Pricing grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.sizes.map(({ size, price }) => {
                    const isPopular = size === POPULAR_SIZE;
                    const sizeDesc =
                      dict.sizeDescriptions[
                        size as keyof typeof dict.sizeDescriptions
                      ];
                    return (
                      <Card
                        key={size}
                        className={`relative flex flex-col justify-between p-6 transition-shadow ${
                          isPopular
                            ? "border-primary ring-2 ring-primary/20 shadow-[var(--shadow-lg)]"
                            : "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
                        }`}
                        style={{
                          borderRadius: "var(--radius)",
                          transitionDuration: "var(--duration-micro)",
                          transitionTimingFunction: "var(--ease-default)",
                        }}
                      >
                        {isPopular && (
                          <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">
                            {dict.pricing.mostPopular}
                          </Badge>
                        )}

                        {/* Size heading */}
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-heading text-3xl font-bold text-foreground">
                              {size}
                            </span>
                            <span className="text-lg font-medium text-muted-foreground">
                              {dict.pricing.perM3}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="font-heading text-2xl font-bold text-primary">
                              &euro;{price}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              excl. VAT
                            </span>
                          </div>

                          {/* Description */}
                          {sizeDesc && (
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {sizeDesc}
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <Button
                          className="mt-5 w-full"
                          variant={isPopular ? "default" : "outline"}
                          render={<Link href={`/${locale}/book`} />}
                        >
                          {dict.pricing.bookNow}
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Footer note */}
        <p className="mt-8 text-sm text-muted-foreground">
          {dict.pricing.vatNote}
        </p>

        {/* Help CTA */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-[var(--radius)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              {dict.pricing.helpText}
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0"
            render={<Link href={`/${locale}/book`} />}
          >
            {dict.pricing.helpCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
