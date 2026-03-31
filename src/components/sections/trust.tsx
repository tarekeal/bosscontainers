import type { Dictionary } from "@/lib/i18n";

interface TrustProps {
  dict: Dictionary;
}

/** Simple inline SVG icons for each stat */
function CalendarIcon() {
  return (
    <svg
      className="size-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg
      className="size-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6M3 6l3 0M9 6v4m3-4v4m3-4v4m3-4v4"
      />
    </svg>
  );
}

function RecycleIcon() {
  return (
    <svg
      className="size-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="size-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function Trust({ dict }: TrustProps) {
  const trustStats = [
    {
      value: dict.trust.since,
      label: dict.trust.sinceDesc,
      icon: <CalendarIcon />,
    },
    {
      value: dict.trust.sizes,
      label: dict.trust.sizesDesc,
      icon: <RulerIcon />,
    },
    {
      value: dict.trust.recycled,
      label: dict.trust.recycledDesc,
      icon: <RecycleIcon />,
    },
    {
      value: dict.trust.area,
      label: dict.trust.areaDesc,
      icon: <MapPinIcon />,
    },
  ];

  return (
    <section
      className="relative border-y border-border bg-muted/50"
      style={{
        paddingTop: "var(--section-padding-y)",
        paddingBottom: "var(--section-padding-y)",
      }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--layout-max-width)" }}
      >
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {trustStats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-3 rounded-[var(--radius)] bg-card p-6 text-center shadow-[var(--shadow-sm)]"
            >
              {/* Icon circle */}
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                {stat.icon}
              </div>

              {/* Large stat value */}
              <span className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
