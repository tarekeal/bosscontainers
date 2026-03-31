"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-background"
      style={{
        paddingTop: "var(--section-padding-y-sm)",
        paddingBottom: "var(--section-padding-y-sm)",
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "2rem 2rem",
        }}
      />

      {/* Ambient glow behind the container visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <div
        className="relative mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
            {dict.hero.tagline}
          </span>

          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {dict.hero.title}{" "}
            <span className="text-primary">{dict.hero.titleHighlight}</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              nativeButton={false}
              className="h-13 px-8 text-base font-semibold shadow-[var(--shadow-md)]"
              render={<Link href={`/${locale}/book`} />}
            >
              {dict.hero.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="h-13 px-8 text-base font-semibold"
              render={<Link href={`/${locale}/pricing`} />}
            >
              {dict.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Right: Bold container visual */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative">
            {/* Main container shape */}
            <div
              className="relative flex h-64 w-80 flex-col items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground sm:h-72 sm:w-96"
              style={{ borderRadius: "var(--radius)" }}
            >
              {/* Ridged lines */}
              <div className="absolute inset-x-4 top-4 flex flex-col gap-2 opacity-20">
                <div className="h-px w-full bg-current" />
                <div className="h-px w-full bg-current" />
                <div className="h-px w-full bg-current" />
              </div>

              <span className="text-5xl font-bold tracking-tight sm:text-6xl">
                8-30m&sup3;
              </span>
              <span className="mt-1 text-sm font-medium uppercase tracking-widest opacity-70">
                containers
              </span>

              {/* Bottom ridged lines */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 opacity-20">
                <div className="h-px w-full bg-current" />
                <div className="h-px w-full bg-current" />
                <div className="h-px w-full bg-current" />
              </div>
            </div>

            {/* Floating badge: Since 2016 */}
            <div
              className="absolute -left-4 -top-4 flex items-center gap-2 bg-card border border-border px-4 py-2 text-sm font-semibold text-card-foreground shadow-[var(--shadow-md)] sm:-left-8 sm:-top-6"
              style={{ borderRadius: "var(--radius)" }}
            >
              <span className="inline-block size-2 rounded-full bg-primary" />
              {dict.trust.since}
            </div>

            {/* Floating badge: 95% Recycled */}
            <div
              className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-card border border-border px-4 py-2 text-sm font-semibold text-card-foreground shadow-[var(--shadow-md)] sm:-bottom-6 sm:-left-8"
              style={{ borderRadius: "var(--radius)" }}
            >
              <span className="inline-block size-2 rounded-full bg-green-500" />
              {dict.trust.recycled} {dict.trust.recycledDesc}
            </div>

            {/* Floating badge: Brussels & Region */}
            <div
              className="absolute -right-4 bottom-8 flex items-center gap-2 bg-card border border-border px-4 py-2 text-sm font-semibold text-card-foreground shadow-[var(--shadow-md)] sm:-right-8"
              style={{ borderRadius: "var(--radius)" }}
            >
              <span className="inline-block size-2 rounded-full bg-blue-500" />
              {dict.trust.area}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
