"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { COMPANY, getNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Locale, Dictionary } from "@/lib/i18n";
import { locales, localeFlags } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavProps {
  locale: Locale;
  dict: Dictionary;
}

export function Nav({ locale, dict }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = getNavLinks(locale, dict);

  /** Replace the locale segment in the current pathname */
  function getLocalePath(targetLocale: Locale): string {
    // pathname is like /fr/pricing or /nl/book
    const segments = pathname.split("/");
    // segments[0] is "", segments[1] is the locale
    if (segments.length >= 2 && locales.includes(segments[1] as Locale)) {
      segments[1] = targetLocale;
    }
    return segments.join("/") || `/${targetLocale}`;
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the locale menu when clicking outside
  useEffect(() => {
    if (!localeMenuOpen) return;

    function handleClickOutside() {
      setLocaleMenuOpen(false);
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [localeMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-[var(--shadow-lg)]"
          : "bg-transparent"
      )}
      style={{
        transitionDuration: "var(--duration-micro)",
        transitionTimingFunction: "var(--ease-default)",
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        style={{ maxWidth: "var(--layout-max-width)" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}/`}
          className="flex items-baseline gap-0.5 text-xl tracking-tight"
          aria-label={COMPANY.name}
        >
          <span className="font-bold text-primary">BOSS</span>
          <span className="font-light text-foreground">CONTAINERS</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-[var(--radius)] px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                )}
                style={{
                  transitionDuration: "var(--duration-micro)",
                  transitionTimingFunction: "var(--ease-default)",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side: locale switcher + phone + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Locale switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocaleMenuOpen((prev) => !prev);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-[var(--radius)] px-2.5 py-1.5 text-xs font-semibold transition-colors",
                "border border-border bg-background/50 text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
              aria-label="Change language"
              aria-expanded={localeMenuOpen}
              aria-haspopup="true"
            >
              <Globe className="size-3.5" aria-hidden="true" />
              {localeFlags[locale]}
            </button>

            {localeMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-background shadow-[var(--shadow-md)]"
                role="menu"
                aria-label="Language options"
              >
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={getLocalePath(loc)}
                    role="menuitem"
                    onClick={() => setLocaleMenuOpen(false)}
                    className={cn(
                      "px-4 py-2 text-xs font-medium transition-colors hover:bg-muted",
                      loc === locale
                        ? "bg-muted text-foreground"
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {localeFlags[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />

          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            style={{
              transitionDuration: "var(--duration-micro)",
              transitionTimingFunction: "var(--ease-default)",
            }}
          >
            <Phone className="size-4" aria-hidden="true" />
            <span>{COMPANY.phone}</span>
          </a>

          <Button nativeButton={false} render={<Link href={`/${locale}/book`} />} size="lg">
            {dict.nav.getQuote}
          </Button>
        </div>

        {/* Mobile: theme + locale pill + phone icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {/* Mobile locale switcher (inline pills) */}
          <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/50 p-0.5">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={getLocalePath(loc)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
                  loc === locale
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground"
                )}
                aria-label={`Switch to ${localeFlags[loc]}`}
                aria-current={loc === locale ? "true" : undefined}
              >
                {localeFlags[loc]}
              </Link>
            ))}
          </div>

          <Button
            nativeButton={false}
            render={
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                aria-label={`Call ${COMPANY.phone}`}
              />
            }
            variant="ghost"
            size="icon"
          >
            <Phone className="size-5" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>
                  <span className="font-bold text-primary">BOSS</span>{" "}
                  <span className="font-light">CONTAINERS</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-[var(--radius)] px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile sheet locale switcher */}
              <div className="mx-4 mt-4 flex items-center gap-1 border-t border-border pt-4">
                <Globe
                  className="mr-1.5 size-4 text-foreground/50"
                  aria-hidden="true"
                />
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={getLocalePath(loc)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors",
                      loc === locale
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/60 hover:bg-muted hover:text-foreground"
                    )}
                    aria-label={`Switch to ${localeFlags[loc]}`}
                    aria-current={loc === locale ? "true" : undefined}
                  >
                    {localeFlags[loc]}
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-border px-4 pt-4">
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-foreground/70"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {COMPANY.phone}
                </a>

                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href={`/${locale}/book`}
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                  size="lg"
                  className="w-full"
                >
                  {dict.nav.getQuote}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
