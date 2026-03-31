import type { Dictionary } from "@/lib/i18n";

interface TestimonialsProps {
  dict: Dictionary;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`size-4 ${i < rating ? "text-amber-400" : "text-muted/60"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ dict }: TestimonialsProps) {
  const reviews = dict.testimonials.reviews as {
    name: string;
    role: string;
    location: string;
    rating: number;
    text: string;
  }[];

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
        {/* Header with Google rating */}
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {dict.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {dict.testimonials.subtitle}
          </p>

          {/* Google rating badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-[var(--shadow-sm)]">
            <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold">
                {dict.testimonials.googleRating}
              </span>
              <StarRating rating={5} />
            </div>
            <span className="text-sm text-muted-foreground">
              {dict.testimonials.googleCount}
            </span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease-default)",
              }}
            >
              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed text-foreground/80">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {review.role} &middot; {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
