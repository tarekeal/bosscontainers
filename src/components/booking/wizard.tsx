"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Locale, Dictionary } from "@/lib/i18n";

import { TOTAL_STEPS, INITIAL_STATE } from "./types";
import type { WizardState } from "./types";
import { StepProject } from "./step-project";
import { StepSize } from "./step-size";
import { StepWaste } from "./step-waste";
import { StepRecommendation } from "./step-recommendation";
import { StepAddress } from "./step-address";
import { StepSchedule } from "./step-schedule";

/* -------------------------------------------------------------------------- */
/*  Step Indicator                                                            */
/* -------------------------------------------------------------------------- */

function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}) {
  return (
    <div className="space-y-3">
      {/* Step dots with current label */}
      <div className="flex items-center gap-1 sm:gap-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          return (
            <div key={i} className="flex items-center gap-1 sm:gap-2">
              <div
                className={`flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground scale-110"
                    : isComplete
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
                style={{ transitionDuration: "var(--duration-micro)" }}
              >
                {isComplete ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5L6.5 12L13 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`h-0.5 w-2 sm:w-6 rounded-full ${
                    isComplete ? "bg-primary/30" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Current step label */}
      <p className="text-sm font-medium text-primary">
        {labels[currentStep - 1]}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Wizard                                                               */
/* -------------------------------------------------------------------------- */

export function BookingWizard({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  const stepLabels = [
    dict.booking.step1Title,
    dict.booking.step2Title,
    dict.booking.step3Title,
    dict.booking.step4Title,
    dict.booking.step5Title,
    dict.booking.step6Title,
  ];

  const goBack = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  }, []);

  const handleStepNext = useCallback(
    (updates: Partial<WizardState>) => {
      setState((prev) => ({ ...prev, ...updates, step: prev.step + 1 }));
    },
    [],
  );

  const handleRestart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const stepProps = {
    state,
    dict,
    locale,
    onNext: handleStepNext,
    onRestart: handleRestart,
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-[var(--shadow-lg)] border-0">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
              {dict.booking.title}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {dict.booking.subtitle}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm font-mono shrink-0">
            {state.step}/{TOTAL_STEPS}
          </Badge>
        </div>
        <StepIndicator
          currentStep={state.step}
          totalSteps={TOTAL_STEPS}
          labels={stepLabels}
        />
      </CardHeader>

      <CardContent className="pt-6 pb-8">
        {/* Back button */}
        {state.step > 1 && (
          <button
            onClick={goBack}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{
              transitionDuration: "var(--duration-micro)",
              transitionTimingFunction: "var(--ease-default)",
            }}
            type="button"
            aria-label={dict.booking.back}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {dict.booking.back}
          </button>
        )}

        {/* Step content */}
        <div
          className="transition-opacity"
          style={{
            transitionDuration: "var(--duration-micro)",
            transitionTimingFunction: "var(--ease-default)",
          }}
        >
          {state.step === 1 && <StepProject {...stepProps} />}
          {state.step === 2 && <StepSize {...stepProps} />}
          {state.step === 3 && <StepWaste {...stepProps} />}
          {state.step === 4 && <StepRecommendation {...stepProps} />}
          {state.step === 5 && <StepAddress {...stepProps} />}
          {state.step === 6 && <StepSchedule {...stepProps} />}
        </div>
      </CardContent>
    </Card>
  );
}
