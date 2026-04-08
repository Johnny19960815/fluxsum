import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@fluxsum/ui-kit';

export default () => {
  return (
    <Accordion type="multiple" style={{ width: '100%', maxWidth: 520 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Content for section one. Multiple items can be open at the same time.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>Content for section two.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>Content for section three.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
