import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SingleAccoridionProps = {
  children: React.ReactNode;
  defaultOpen?: true;
  title: string;
  disabled?: boolean;
};

export const SingleAccoridion: React.FC<SingleAccoridionProps> = ({
  children,
  title,
  defaultOpen,
  disabled,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen && "item-1"}
      disabled={disabled}
    >
      <AccordionItem
        value="item-1"
        disabled
      >
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
