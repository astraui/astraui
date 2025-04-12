import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq: React.FC = () => {
    return (
        <Accordion type="single" collapsible className="text-black dark:text-white">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-base md:text-lg font-bold questions">
                    Do you offer dark mode support?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes, dark mode is fully supported. Just use the dark element in the class.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-base md:text-lg font-bold questions">
                    How does it integrate with Tailwind CSS?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    It works seamlessly with Tailwind, leveraging utility classes for styling flexibility.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-base md:text-lg font-bold questions">
                    Can I customize the components?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes, you can fully customize components to fit your project’s design and functionality needs.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="text-base md:text-lg font-bold questions">
                    Is it compatible with TypeScript?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes, the library is TypeScript-ready, ensuring full type safety in your React projects.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Faq;
