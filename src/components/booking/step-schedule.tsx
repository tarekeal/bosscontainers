import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY } from "@/lib/data";
import { localeDateFormats } from "@/lib/i18n";
import { generateAvailability, formatDate, isSameDay } from "./helpers";
import type { StepProps, AvailabilityDay } from "./types";
import type { Locale, Dictionary } from "@/lib/i18n";

/* -------------------------------------------------------------------------- */
/*  Availability Calendar                                                     */
/* -------------------------------------------------------------------------- */

function AvailabilityCalendar({
  days,
  selectedDate,
  onSelectDate,
  dict,
  locale,
}: {
  days: AvailabilityDay[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  dict: Dictionary;
  locale: Locale;
}) {
  const firstDay = days[0]?.date;
  const startOffset = firstDay ? (firstDay.getDay() + 6) % 7 : 0;

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1);
    return d.toLocaleDateString(localeDateFormats[locale], {
      weekday: "narrow",
    });
  });

  const statusStyles: Record<
    AvailabilityDay["status"],
    { bg: string; ring: string; text: string; cursor: string }
  > = {
    available: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      ring: "ring-emerald-200 dark:ring-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      cursor:
        "cursor-pointer hover:ring-emerald-400 dark:hover:ring-emerald-600",
    },
    limited: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      ring: "ring-amber-200 dark:ring-amber-800",
      text: "text-amber-700 dark:text-amber-300",
      cursor: "cursor-pointer hover:ring-amber-400 dark:hover:ring-amber-600",
    },
    unavailable: {
      bg: "bg-muted/50",
      ring: "ring-transparent",
      text: "text-muted-foreground/50 line-through",
      cursor: "cursor-not-allowed",
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
        {weekdays.map((day, i) => (
          <div
            key={i}
            className="text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {Array.from({ length: startOffset }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const style = statusStyles[day.status];
          const isSelectable = day.status !== "unavailable";
          const isSelected =
            selectedDate !== null && isSameDay(day.date, selectedDate);

          return (
            <button
              key={day.date.toISOString()}
              type="button"
              disabled={!isSelectable}
              onClick={() => isSelectable && onSelectDate(day.date)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-[var(--radius)] ring-1 transition-all
                ${style.bg} ${style.ring} ${style.text} ${style.cursor}
                ${isSelected ? "!ring-2 !ring-primary !bg-primary/10" : ""}
              `}
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
              aria-label={`${formatDate(day.date, locale)} - ${day.status}`}
              aria-pressed={isSelected}
            >
              <span className="text-sm sm:text-lg font-bold leading-tight">
                {day.date.getDate()}
              </span>
              <span className="text-[9px] sm:text-[10px] leading-tight">
                {day.date.toLocaleDateString(localeDateFormats[locale], {
                  weekday: "short",
                })}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-200 dark:bg-emerald-800" />
          {dict.booking.availability.available}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-200 dark:bg-amber-800" />
          {dict.booking.availability.limited}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-muted" />
          {dict.booking.availability.unavailable}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step Schedule                                                             */
/* -------------------------------------------------------------------------- */

export function StepSchedule({ state, dict, locale, onRestart }: StepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    state.selectedDate,
  );
  const [selectedSlot, setSelectedSlot] = useState<
    "morning" | "afternoon" | null
  >(state.selectedSlot);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const availabilityDays = useMemo(() => generateAvailability(), []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  }, []);

  if (!state.waste || !state.sizeM3) return null;

  const recommendedSize = state.sizeM3;
  const recommendedPrice =
    state.waste.sizes.find((s) => s.size === recommendedSize)?.price ?? null;

  const translatedWasteName =
    dict.services.categories[
      state.waste.id as keyof typeof dict.services.categories
    ]?.name ?? state.waste.id;

  const isContactValid =
    contact.name.trim() !== "" &&
    contact.phone.trim() !== "" &&
    contact.email.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Success state
  if (submitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <svg
            className="size-8 text-emerald-600 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold">{dict.booking.quote.success}</h3>
        <p className="text-muted-foreground">
          {dict.booking.quote.successMessage}
        </p>
        <div className="pt-4">
          <button
            onClick={() => onRestart?.()}
            className="text-sm text-primary hover:underline underline-offset-4"
            type="button"
          >
            {dict.booking.restart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          {dict.booking.availability.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {dict.booking.availability.subtitle}
        </p>
      </div>

      <AvailabilityCalendar
        days={availabilityDays}
        selectedDate={selectedDate}
        onSelectDate={selectDate}
        dict={dict}
        locale={locale}
      />

      {/* Time slot selection */}
      {selectedDate && (
        <div className="space-y-3">
          <p className="text-sm font-medium">
            {dict.booking.availability.deliverySlot}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(["morning", "afternoon"] as const).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 text-sm font-medium rounded-[var(--radius)] border-2 transition-all text-center ${
                  selectedSlot === slot
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent bg-muted/50 hover:border-primary/50"
                }`}
                style={{
                  transitionDuration: "var(--duration-micro)",
                  transitionTimingFunction: "var(--ease-default)",
                }}
                aria-pressed={selectedSlot === slot}
              >
                {dict.booking.availability[slot]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary + contact form (inline, no dialog) */}
      {selectedDate && selectedSlot && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order summary */}
          <div className="rounded-[var(--radius)] bg-primary/5 border border-primary/20 p-4 sm:p-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {dict.booking.step4Title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-y-1.5 sm:gap-y-2.5 gap-x-4 text-sm">
              <span className="text-muted-foreground">Container</span>
              <span className="font-semibold">
                {recommendedSize}m&sup3; &mdash; {translatedWasteName}
              </span>

              {recommendedPrice !== null && (
                <>
                  <span className="text-muted-foreground">
                    {dict.booking.exclVat.split(".")[0]}
                  </span>
                  <span className="font-bold text-primary text-lg">
                    &euro;{recommendedPrice}
                  </span>
                </>
              )}

              <span className="text-muted-foreground">
                {dict.booking.address.street.split(" ")[0]}
              </span>
              <span className="font-semibold">
                {state.address.street}, {state.address.postalCode}{" "}
                {state.address.city}
              </span>

              <span className="text-muted-foreground">
                {dict.booking.availability.selectedDate}
              </span>
              <span className="font-semibold">
                {formatDate(selectedDate, locale)} &mdash;{" "}
                {dict.booking.availability[selectedSlot]}
              </span>
            </div>
          </div>

          {/* Inline contact fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {dict.booking.quote.title}
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="booking-name">{dict.booking.quote.name}</Label>
                <Input
                  id="booking-name"
                  value={contact.name}
                  onChange={(e) =>
                    setContact((prev) => ({
                      ...prev,
                      name: (e.target as HTMLInputElement).value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-phone">
                  {dict.booking.quote.phone}
                </Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((prev) => ({
                      ...prev,
                      phone: (e.target as HTMLInputElement).value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email">{dict.booking.quote.email}</Label>
              <Input
                id="booking-email"
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact((prev) => ({
                    ...prev,
                    email: (e.target as HTMLInputElement).value,
                  }))
                }
                required
              />
            </div>
          </div>

          {/* Submit + call */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              size="lg"
              className="flex-1 text-base font-bold"
              disabled={!isContactValid}
            >
              {dict.booking.quote.send}
            </Button>

            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {dict.booking.callUs} {COMPANY.phone}
            </a>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            {dict.booking.exclVat}
          </p>

          {/* Restart */}
          <div className="text-center">
            <button
              onClick={() => onRestart?.()}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              type="button"
            >
              {dict.booking.restart}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
