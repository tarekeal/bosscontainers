import { PROJECT_OPTIONS } from "@/lib/data";
import type { StepProps } from "./types";

export function StepProject({ dict, onNext }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{dict.booking.step1Title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROJECT_OPTIONS.map((project) => {
          const translated =
            dict.booking.projects[
              project.id as keyof typeof dict.booking.projects
            ];
          return (
            <button
              key={project.id}
              onClick={() =>
                onNext({
                  project,
                  sizeM3: null,
                  waste: null,
                })
              }
              className="group relative flex flex-col items-start gap-2 p-5 rounded-[var(--radius)] border-2 border-transparent bg-muted/50 text-left transition-all hover:border-primary hover:shadow-[var(--shadow-md)] hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
              type="button"
              data-testid={`project-${project.id}`}
            >
              <span
                className="text-3xl"
                role="img"
                aria-label={translated.name}
              >
                {project.icon}
              </span>
              <span className="font-semibold text-base">{translated.name}</span>
              <span className="text-sm text-muted-foreground leading-snug">
                {translated.description}
              </span>
              <span
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                style={{
                  transitionDuration: "var(--duration-micro)",
                }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
