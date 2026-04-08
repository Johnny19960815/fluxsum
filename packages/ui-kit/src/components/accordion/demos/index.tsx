import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@fluxsum/ui-kit';

export default () => {
  return (
    <Accordion type="single" collapsible style={{ width: '100%', maxWidth: 520 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Fluxsum UI?</AccordionTrigger>
        <AccordionContent>
          Fluxsum UI is a component library built with React, TypeScript, Tailwind CSS and Radix UI primitives.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Run <code>bun add @fluxsum/ui-kit</code> to install the package.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. All components follow WAI-ARIA guidelines and are built on top of Radix UI primitives.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
