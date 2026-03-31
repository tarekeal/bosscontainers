import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface CTAProps {
  locale: Locale;
  dict: Dictionary;
}

export function CTA({ locale, dict }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      {/* Amber gradient accent line at top */}
      <div
        className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
        aria-hidden="true"
      />

      <div
        style={{
          paddingTop: "var(--section-padding-y)",
          paddingBottom: "var(--section-padding-y)",
        }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "2rem 2rem",
          }}
          aria-hidden="true"
        />

        <div
          className="relative mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16"
          style={{ maxWidth: "var(--layout-max-width)" }}
        >
          {/* Left: Copy + CTAs */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {dict.cta.title}
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-secondary-foreground/70">
              {dict.cta.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                nativeButton={false}
                className="h-14 px-8 text-base font-semibold"
                render={<Link href={`/${locale}/book`} />}
              >
                {dict.cta.button}
              </Button>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-secondary-foreground/30 bg-transparent px-8 text-base font-semibold text-secondary-foreground transition-colors hover:bg-secondary-foreground/10"
              >
                {dict.cta.call} {COMPANY.phone}
              </a>
            </div>
          </div>

          {/* Right: Contact info as typographic element */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="flex flex-col gap-6">
              {/* Phone number — large typographic display */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/40">
                  {dict.cta.call}
                </span>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="font-heading text-3xl font-bold tracking-tight text-primary transition-colors sm:text-4xl lg:text-5xl"
                  style={{
                    transitionDuration: "var(--duration-micro)",
                    transitionTimingFunction: "var(--ease-default)",
                  }}
                >
                  {COMPANY.phone}
                </a>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full bg-secondary-foreground/10"
                aria-hidden="true"
              />

              {/* Address */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/40">
                  {dict.footer?.address ?? "Address"}
                </span>
                <address className="not-italic text-base leading-relaxed text-secondary-foreground/70">
                  {COMPANY.address}
                </address>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/40">
                  {dict.footer?.hours ?? "Hours"}
                </span>
                <div className="text-base text-secondary-foreground/70">
                  <p>
                    {dict.footer?.weekdays ?? "Mon - Sat"}:{" "}
                    {COMPANY.hours.weekdays}
                  </p>
                  <p>
                    {dict.footer?.sunday ?? "Sun"}:{" "}
                    {COMPANY.hours.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
