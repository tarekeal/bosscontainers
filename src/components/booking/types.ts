import type { ProjectOption, WasteCategory } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export type SizeLabel = "small" | "medium" | "large";

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface WizardState {
  step: number;
  project: ProjectOption | null;
  sizeM3: number | null;
  waste: WasteCategory | null;
  address: Address;
  selectedDate: Date | null;
  selectedSlot: "morning" | "afternoon" | null;
}

export interface AvailabilityDay {
  date: Date;
  status: "available" | "limited" | "unavailable";
}

export interface StepProps {
  state: WizardState;
  dict: Dictionary;
  locale: Locale;
  onNext: (updates: Partial<WizardState>) => void;
  onRestart?: () => void;
}

export const TOTAL_STEPS = 6;

export const INITIAL_STATE: WizardState = {
  step: 1,
  project: null,
  sizeM3: null,
  waste: null,
  address: { street: "", city: "", postalCode: "" },
  selectedDate: null,
  selectedSlot: null,
};
