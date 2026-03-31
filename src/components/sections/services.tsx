import { WASTE_CATEGORIES } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";

interface ServicesProps {
  dict: Dictionary;
}

const CATEGORY_BG: Record<string, string> = {
  mixed: "bg-amber-100 dark:bg-amber-900/40",
  rubble: "bg-slate-200 dark:bg-slate-800",
  wood: "bg-orange-100 dark:bg-orange-900/40",
  cardboard: "bg-yellow-100 dark:bg-yellow-900/40",
  green: "bg-emerald-100 dark:bg-emerald-900/40",
  soil: "bg-stone-200 dark:bg-stone-800",
};

export function Services({ dict }: ServicesProps) {
  return (
    <section
      className="relative"
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
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WASTE_CATEGORIES.map((category) => {
            const catDict =
              dict.services.categories[
                category.id as keyof typeof dict.services.categories
              ];
            const bg = CATEGORY_BG[category.id] ?? "bg-muted";

            return (
              <Card
                key={category.id}
                className="group relative flex flex-col overflow-hidden border-t-[3px] border-t-primary transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                style={{
                  transitionDuration: "var(--duration-micro)",
                  transitionTimingFunction: "var(--ease-default)",
                }}
              >
                {/* Fixed-height top: icon + price */}
                <div className="flex items-start justify-between px-4">
                  <div
                    className={`flex size-11 items-center justify-center text-xl ${bg}`}
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    {category.icon}
                  </div>
                  <span className="text-right">
                    <span className="block text-2xl font-bold text-primary tabular-nums">
                      &euro;{category.sizes[0].price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dict.services.from}
                    </span>
                  </span>
                </div>

                {/* Title + description (grows to fill) */}
                <div className="flex-1 px-4">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {catDict.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {catDict.description}
                  </p>
                </div>

                {/* Badges (pinned below description) */}
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {category.sizes[0].size}m&sup3;
                      {category.sizes.length > 1 && (
                        <>
                          {" - "}
                          {category.sizes[category.sizes.length - 1].size}
                          m&sup3;
                        </>
                      )}
                    </Badge>
                    <Badge variant="secondary">
                      {category.sizes.length === 1
                        ? `1 ${dict.services.sizes}`
                        : `${category.sizes.length} ${dict.services.sizes}`}
                    </Badge>
                  </div>
                </CardContent>

                {/* Footer (pinned to bottom) */}
                <CardFooter>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary/60 transition-all group-hover:text-primary group-hover:translate-x-1"
                    style={{
                      transitionDuration: "var(--duration-micro)",
                      transitionTimingFunction: "var(--ease-default)",
                    }}
                  >
                    {dict.pricing?.bookNow ?? "Book now"}
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
