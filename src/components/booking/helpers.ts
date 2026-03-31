import type { Locale } from "@/lib/i18n";
import { localeDateFormats } from "@/lib/i18n";
import type { AvailabilityDay } from "./types";

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateAvailability(): AvailabilityDay[] {
  const today = new Date();
  const seed =
    today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();
  const days: AvailabilityDay[] = [];
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    if (date.getDay() === 0) {
      days.push({ date, status: "unavailable" });
    } else {
      const rand = seededRandom(seed + i);
      days.push({
        date,
        status:
          rand > 0.3 ? "available" : rand > 0.1 ? "limited" : "unavailable",
      });
    }
  }
  return days;
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(localeDateFormats[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getContainerImage(size: number): string {
  if (size <= 10) return "/images/container-8m3.svg";
  if (size <= 20) return "/images/container-20m3.svg";
  return "/images/container-30m3.svg";
}
