"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ContactFormProps {
  dict: Dictionary;
  locale: Locale;
  /** Pre-filled message text (e.g. booking summary) */
  prefillMessage?: string;
  /** Which dictionary namespace to use for field labels */
  variant?: "booking" | "contact";
}

export function ContactForm({
  dict,
  locale: _locale,
  prefillMessage,
  variant = "booking",
}: ContactFormProps) {
  const labels =
    variant === "booking"
      ? {
          name: dict.booking.quote.name,
          email: dict.booking.quote.email,
          phone: dict.booking.quote.phone,
          message: dict.booking.quote.message,
          send: dict.booking.quote.send,
          success: dict.booking.quote.success,
          successMessage: dict.booking.quote.successMessage,
          messagePlaceholder: undefined as string | undefined,
        }
      : {
          name: dict.contact.name,
          email: dict.contact.email,
          phone: dict.contact.phone,
          message: dict.contact.message,
          send: dict.contact.send,
          success: dict.contact.success,
          successMessage: dict.contact.successMessage,
          messagePlaceholder: dict.contact.messagePlaceholder as
            | string
            | undefined,
        };

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: prefillMessage ?? "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In a real app, this would send data to an API
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-8 text-center space-y-3">
        <div className="text-4xl" role="img" aria-label="Checkmark">
          &#10003;
        </div>
        <p className="text-lg font-semibold">{labels.success}</p>
        <p className="text-muted-foreground">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{labels.name}</Label>
          <Input
            id="contact-name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{labels.email}</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone">{labels.phone}</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formState.phone}
          onChange={handleChange}
          placeholder="+32 ..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{labels.message}</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={variant === "contact" ? 5 : 3}
          placeholder={labels.messagePlaceholder}
        />
      </div>
      <Button type="submit" className="w-full" size="lg">
        {labels.send}
      </Button>
    </form>
  );
}
