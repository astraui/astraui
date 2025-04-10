import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq: React.FC = (): React.ReactNode => {
    return (
        <Accordion type="single" collapsible className="text-black dark:text-white">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-base md:text-lg font-bold">
                    What makes Links unique?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    It&apos;s fast, clean, and fully in your control—no clutter, just
                    what you need.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-base md:text-lg font-bold">
                    Can I use it beyond social media?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes! Use it as a mini-site, portfolio, or digital business
                    card.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-base md:text-lg font-bold">
                    Do I fully own my page?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes! Links is open-source, meaning you can host it yourself
                    and modify it.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="text-base md:text-lg font-bold">
                    Is Links free to use?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                    Yes! It&apos;s completely free, without any hidden fees or paywalls.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Faq;