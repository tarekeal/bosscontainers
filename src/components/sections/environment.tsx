import type { Dictionary } from "@/lib/i18n";

interface EnvironmentProps {
  dict: Dictionary;
}

/** Recycle arrows icon */
function RecycleIcon({ className }: { className?: string }) {
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
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0-.009-1.78L16.8 9.5" />
      <path d="m9.5 5.5 2.5-3 2.5 3" />
      <path d="M12 2.5V12" />
      <path d="m4.711 17.5-3.21-.5 1.016-3.038" />
      <path d="m19.289 17.5 3.21-.5-1.016-3.038" />
    </svg>
  );
}

/** Truck delivery icon */
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

/** Leaf / eco icon */
function LeafIcon({ className }: { className?: string }) {
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
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
    </svg>
  );
}

export function Environment({ dict }: EnvironmentProps) {
  const stats = [
    {
      value: dict.environment.stats.recycled,
      label: dict.environment.stats.recycledLabel,
      Icon: RecycleIcon,
    },
    {
      value: dict.environment.stats.trips,
      label: dict.environment.stats.tripsLabel,
      Icon: TruckIcon,
    },
    {
      value: dict.environment.stats.center,
      label: dict.environment.stats.centerLabel,
      Icon: LeafIcon,
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--section-padding-y)",
        paddingBottom: "var(--section-padding-y)",
      }}
    >
      <div
        className="relative mx-auto px-6"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {dict.environment.title}
          </h2>
        </div>

        {/* Big typographic hero number */}
        <div className="mb-12 flex flex-col items-center">
          <span className="font-heading text-[7rem] font-black leading-none tracking-tighter text-transparent sm:text-[10rem] lg:text-[13rem]"
            style={{
              backgroundImage: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            95%
          </span>
          <p className="mt-2 text-center text-lg font-medium text-muted-foreground sm:text-xl">
            {dict.environment.subtitle}
          </p>
        </div>

        {/* Three stat cards in a row */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-4 rounded-[var(--radius)] border border-green-200/60 bg-green-50/50 p-8 text-center transition-shadow dark:border-green-900/30 dark:bg-green-950/20"
              style={{
                boxShadow: "var(--shadow-sm)",
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <stat.Icon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Full-width commitment description on green-tinted background */}
        <div
          className="rounded-[var(--radius)] border border-green-200/50 bg-gradient-to-r from-green-50 via-emerald-50/50 to-green-50 p-8 sm:p-10 dark:border-green-900/30 dark:from-green-950/30 dark:via-emerald-950/20 dark:to-green-950/30"
        >
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-foreground/80 sm:text-lg">
            {dict.environment.description}
          </p>
        </div>
      </div>
    </section>
  );
}
