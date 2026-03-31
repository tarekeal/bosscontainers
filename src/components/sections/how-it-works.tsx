import type { Dictionary } from "@/lib/i18n";

const STEP_NUMBERS = ["01", "02", "03"] as const;

interface HowItWorksProps {
  dict: Dictionary;
}

/** Clipboard/form icon for step 1 */
function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x={9} y={3} width={6} height={4} rx={1} />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

/** Checkmark circle icon for step 2 */
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** Truck/delivery icon for step 3 */
function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx={5.5} cy={18.5} r={2.5} />
      <circle cx={18.5} cy={18.5} r={2.5} />
    </svg>
  );
}

const STEP_ICONS = [ClipboardIcon, CheckCircleIcon, TruckIcon] as const;

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section
      className="relative bg-background"
      style={{
        paddingTop: "var(--section-padding-y)",
        paddingBottom: "var(--section-padding-y)",
      }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {dict.howItWorks.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps — desktop: 3 columns with connectors */}
        <div className="relative">
          {/* Horizontal dashed connector line (desktop only) */}
          <div
            className="pointer-events-none absolute top-[3.25rem] right-[16.67%] left-[16.67%] hidden md:block"
            aria-hidden="true"
          >
            <div className="h-px w-full border-t-2 border-dashed border-primary/30" />
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
            {dict.howItWorks.steps.map(
              (
                step: { title: string; description: string },
                index: number
              ) => {
                const Icon = STEP_ICONS[index];

                return (
                  <div
                    key={STEP_NUMBERS[index]}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Oversized faded step number as background */}
                    <span
                      className="pointer-events-none absolute -top-6 select-none font-heading text-[8rem] font-black leading-none text-foreground/[0.04]"
                      aria-hidden="true"
                    >
                      {STEP_NUMBERS[index]}
                    </span>

                    {/* Icon circle */}
                    <div
                      className="relative z-10 flex size-[6.5rem] items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5"
                      style={{
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <Icon className="size-8 text-primary" />
                    </div>

                    {/* Text content */}
                    <div className="mt-8 flex flex-col gap-3">
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mx-auto max-w-xs leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Mobile vertical connector (between steps) */}
                    {index < dict.howItWorks.steps.length - 1 && (
                      <div
                        className="mt-8 flex flex-col items-center md:hidden"
                        aria-hidden="true"
                      >
                        <div className="h-12 w-px border-l-2 border-dashed border-primary/30" />
                        {/* Arrow tip */}
                        <div className="size-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-primary/30" />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
