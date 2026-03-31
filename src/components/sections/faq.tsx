import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/i18n";

interface FaqProps {
  dict: Dictionary;
}

export function FAQ({ dict }: FaqProps) {
  const items: { q: string; a: string }[] = dict.faq.items;

  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.faq.title}
          </h2>
        </div>
        <Accordion>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-base font-semibold py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
