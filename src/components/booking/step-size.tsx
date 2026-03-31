import { Badge } from "@/components/ui/badge";
import type { StepProps, SizeLabel } from "./types";

export function StepSize({ state, dict, onNext }: StepProps) {
  if (!state.project) return null;

  const selectSize = (label: SizeLabel) => {
    const sizeM3 = state.project!.suggestedSizes[label];
    onNext({ sizeM3 });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{dict.booking.step2Title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(["small", "medium", "large"] as SizeLabel[]).map((label, i) => {
          const sizeM3 = state.project!.suggestedSizes[label];
          const translatedLabel =
            dict.booking.sizeLabels[
              label as keyof typeof dict.booking.sizeLabels
            ];
          const examples =
            dict.booking.sizeExamples[
              state.project!.id as keyof typeof dict.booking.sizeExamples
            ];
          const translatedExample = examples
            ? (examples as Record<string, string>)[label]
            : "";
          const barWidths = ["40%", "65%", "100%"];

          return (
            <button
              key={label}
              onClick={() => selectSize(label)}
              className="group relative flex flex-col gap-3 p-5 rounded-[var(--radius)] border-2 border-transparent bg-muted/50 text-left transition-all hover:border-primary hover:shadow-[var(--shadow-md)] hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
              type="button"
              data-testid={`size-${label}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-lg">{translatedLabel}</span>
                <Badge variant="outline" className="font-mono text-sm">
                  {sizeM3}m&sup3;
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {translatedExample}
              </span>
              {/* Visual size indicator */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-primary/60 rounded-full group-hover:bg-primary transition-colors"
                  style={{
                    width: barWidths[i],
                    transitionDuration: "var(--duration-micro)",
                    transitionTimingFunction: "var(--ease-default)",
                  }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {(dict.sizeDescriptions as Record<number, string>)[sizeM3] ??
                  ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
