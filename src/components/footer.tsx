import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY, getNavLinks } from "@/lib/data";
import type { Locale, Dictionary } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const SERVICE_KEYS = [
  "mixed",
  "rubble",
  "wood",
  "cardboard",
  "green",
  "soil",
] as const;

export function Footer({ locale, dict }: FooterProps) {
  const navLinks = getNavLinks(locale, dict);

  const services = SERVICE_KEYS.map((key) => ({
    label: dict.services.categories[key].name,
    href: `/${locale}/pricing`,
  }));

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: "var(--layout-max-width)",
          paddingTop: "var(--section-padding-y)",
          paddingBottom: "var(--section-padding-y)",
        }}
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}/`}
              className="mb-4 inline-flex items-baseline gap-0.5 text-xl tracking-tight"
              aria-label={COMPANY.name}
            >
              <span className="font-bold text-primary">BOSS</span>
              <span className="font-light">CONTAINERS</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary-foreground/70">
              {dict.footer.description}
            </p>
            {COMPANY.social.facebook && (
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="size-5"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>Facebook</span>
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/50">
              {dict.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/50">
              {dict.footer.ourServices}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/50">
              {dict.footer.contactUs}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <MapPin
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{COMPANY.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-secondary-foreground/70">
                <Clock
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p>
                    {dict.contact.monSat}: {COMPANY.hours.weekdays}
                  </p>
                  <p>
                    {dict.contact.sunday}: {COMPANY.hours.sunday}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div
          className="mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-secondary-foreground/50 sm:flex-row sm:px-6 lg:px-8"
          style={{ maxWidth: "var(--layout-max-width)" }}
        >
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}.{" "}
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span>VAT: {COMPANY.vat}</span>
            <Link
              href={`/${locale}/privacy`}
              className="transition-colors hover:text-secondary-foreground/80"
            >
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
