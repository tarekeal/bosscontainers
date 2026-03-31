import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getContainerImage } from "./helpers";
import type { StepProps } from "./types";

export function StepRecommendation({ state, dict, onNext }: StepProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);

  if (!state.project || !state.waste || !state.sizeM3) return null;

  const recommendedSize = state.sizeM3;
  const displaySize = selectedSize ?? recommendedSize;

  const availableSizes = state.waste.sizes;
  const alternativeSizes = availableSizes.filter(
    (s) => s.size !== recommendedSize,
  );

  const displayPrice = useMemo(() => {
    const match = state.waste!.sizes.find((s) => s.size === displaySize);
    return match?.price ?? null;
  }, [state.waste, displaySize]);

  const translatedWasteName =
    dict.services.categories[
      state.waste.id as keyof typeof dict.services.categories
    ]?.name ?? state.waste.id;

  const sizeDesc =
    (dict.sizeDescriptions as Record<number, string>)[displaySize] ?? "";

  const handleNext = () => {
    if (selectedSize !== null && selectedSize !== recommendedSize) {
      onNext({ sizeM3: selectedSize });
    } else {
      onNext({});
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{dict.booking.step4Title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {translatedWasteName}
        </p>
      </div>

      {/* Primary recommendation card */}
      <div className="rounded-[var(--radius)] border-2 border-primary bg-primary/5 p-4 sm:p-5 space-y-4">
        {/* Size + badge + price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-bold">{displaySize}m&sup3;</span>
            {displaySize === recommendedSize && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                {dict.booking.recommended}
              </Badge>
            )}
          </div>
          {displayPrice !== null && (
            <p className="text-2xl font-bold text-primary tabular-nums shrink-0">
              &euro;{displayPrice}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{sizeDesc}</p>

        {/* Proportional bar */}
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${(displaySize / 30) * 100}%`,
              transitionDuration: "var(--duration-micro)",
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground">{dict.booking.exclVat}</p>

        {/* Back to recommended — only shown when user picked an alternative */}
        {selectedSize !== null && selectedSize !== recommendedSize && (
          <button
            type="button"
            onClick={() => setSelectedSize(null)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {dict.booking.recommended} ({recommendedSize}m&sup3;)
          </button>
        )}

        {/* Next button right here — no scrolling needed */}
        <Button
          size="lg"
          className="w-full text-base font-bold"
          onClick={handleNext}
        >
          {dict.booking.next}
        </Button>
      </div>

      {/* Expandable alternatives */}
      {alternativeSizes.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowAlternatives((prev) => !prev)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--duration-micro)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform ${showAlternatives ? "rotate-90" : ""}`}
              style={{ transitionDuration: "var(--duration-micro)" }}
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {dict.booking.differentSize}
          </button>

          {showAlternatives && (
            <div className="mt-3 grid gap-2">
              {alternativeSizes.map((s) => {
                const isSelected = s.size === displaySize;
                return (
                  <button
                    key={s.size}
                    onClick={() => {
                      setSelectedSize(s.size);
                      setShowAlternatives(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-[var(--radius)] border text-left transition-all text-sm ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                    style={{
                      transitionDuration: "var(--duration-micro)",
                      transitionTimingFunction: "var(--ease-default)",
                    }}
                    type="button"
                  >
                    <span className="font-bold w-14 shrink-0">
                      {s.size}m&sup3;
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/40"
                        style={{ width: `${(s.size / 30) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold tabular-nums shrink-0">
                      &euro;{s.price}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

