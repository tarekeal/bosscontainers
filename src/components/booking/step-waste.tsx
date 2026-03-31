import { useEffect, useMemo } from "react";
import { WASTE_CATEGORIES } from "@/lib/data";
import type { StepProps } from "./types";

export function StepWaste({ state, dict, onNext }: StepProps) {
  const relevantWaste = useMemo(() => {
    if (!state.project) return [];
    return WASTE_CATEGORIES.filter((wc) =>
      state.project!.typicalWaste.includes(wc.id),
    );
  }, [state.project]);

  // Auto-advance if only one waste type
  useEffect(() => {
    if (relevantWaste.length === 1) {
      onNext({ waste: relevantWaste[0] });
    }
  }, [relevantWaste, onNext]);

  if (!state.project) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{dict.booking.step3Title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relevantWaste.map((waste) => {
          const translated =
            dict.services.categories[
              waste.id as keyof typeof dict.services.categories
            ];
          return (
            <button
              key={waste.id}
              onClick={() => onNext({ waste })}
              className="group flex items-start gap-4 p-5 rounded-[var(--radius)] border-2 border-transparent bg-muted/50 text-left transition-all hover:border-primary hover:shadow-[var(--shadow-md)] hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
              type="button"
              data-testid={`waste-${waste.id}`}
            >
              <span
                className="text-3xl shrink-0"
                role="img"
                aria-label={translated.name}
              >
                {waste.icon}
              </span>
              <div className="space-y-1">
                <span className="font-semibold text-base block">
                  {translated.name}
                </span>
                <span className="text-sm text-muted-foreground leading-snug block">
                  {translated.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
