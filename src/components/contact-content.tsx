"use client";

import { COMPANY } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/booking/contact-form";

interface ContactContentProps {
  dict: Dictionary;
  locale: Locale;
}

export function ContactContent({ dict, locale }: ContactContentProps) {
  return (
    <main
      className="relative"
      style={{
        paddingTop: "var(--section-padding-y)",
        paddingBottom: "var(--section-padding-y)",
      }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        {/* Page header */}
        <div className="mb-12 max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <h2 className="font-heading mb-6 text-xl font-semibold text-foreground">
              {dict.contact.formTitle}
            </h2>

            <ContactForm dict={dict} locale={locale} variant="contact" />
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-heading mb-4 text-xl font-semibold text-foreground">
                {dict.contact.details}
              </h2>
              <div className="flex flex-col gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">
                    {dict.contact.phone}
                  </span>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="text-primary hover:underline"
                  >
                    {COMPANY.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">
                    {dict.contact.email}
                  </span>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-primary hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">
                    {dict.contact.address}
                  </span>
                  <span className="text-muted-foreground">
                    {COMPANY.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div>
              <h3 className="font-heading mb-3 text-lg font-semibold text-foreground">
                {dict.contact.hours}
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {dict.contact.monSat}
                  </span>
                  <span className="font-medium text-foreground">
                    {COMPANY.hours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {dict.contact.sunday}
                  </span>
                  <span className="font-medium text-foreground">
                    {dict.contact.closed}
                  </span>
                </div>
              </div>
            </div>

            {/* Service area */}
            <div className="rounded-[var(--radius)] bg-secondary p-6 text-secondary-foreground shadow-[var(--shadow-sm)]">
              <h3 className="font-heading mb-2 text-lg font-semibold">
                {dict.contact.serviceArea}
              </h3>
              <p className="text-secondary-foreground/80">
                {dict.contact.serviceAreaDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
