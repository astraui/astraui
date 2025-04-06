"use client";

import * as React from "react";
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";

type AccordionItemValue = string;

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: AccordionItemValue | AccordionItemValue[];
  value?: AccordionItemValue | AccordionItemValue[];
  onValueChange?: (value: AccordionItemValue | AccordionItemValue[]) => void;
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AccordionContextValue {
  type: "single" | "multiple";
  value: AccordionItemValue | AccordionItemValue[];
  onValueChange: (value: AccordionItemValue | AccordionItemValue[]) => void;
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordionContext must be used within an Accordion");
  }
  return context;
};

export function Accordion({
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  collapsible = false,
  className,
  children,
  ...props
}: AccordionProps & Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onValueChange">) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<AccordionItemValue | AccordionItemValue[]>(
    defaultValue ?? (type === "single" ? "" : [])
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const onValueChange = React.useCallback((itemValue: AccordionItemValue | AccordionItemValue[]) => {
    if (!isControlled) {
      setUncontrolledValue(itemValue);
    }
    controlledOnValueChange?.(itemValue);
  }, [isControlled, controlledOnValueChange]);

  const contextValue = React.useMemo(() => ({
    type,
    value,
    onValueChange,
    collapsible,
  }), [type, value, onValueChange, collapsible]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn("accordion", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: AccordionItemValue;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const AccordionItemContext = React.createContext<{
  value: AccordionItemValue;
  isOpen: boolean;
  toggle: () => void;
  disabled?: boolean;
} | undefined>(undefined);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItemContext must be used within an AccordionItem");
  }
  return context;
};

export function AccordionItem({
  value,
  className,
  disabled,
  children,
  ...props
}: AccordionItemProps & Omit<React.HTMLAttributes<HTMLDivElement>, "value">) {
  const context = useAccordionContext();

  const { type, value: selectedValue, onValueChange, collapsible } = context;

  const isOpen = type === "single"
    ? selectedValue === value
    : Array.isArray(selectedValue) && selectedValue.includes(value);

  const toggle = React.useCallback(() => {
    if (disabled) return;

    if (type === "single") {
      if (isOpen && collapsible) {
        onValueChange("");
      } else {
        onValueChange(value);
      }
    } else {
      if (isOpen) {
        if (collapsible || (Array.isArray(selectedValue) && selectedValue.length > 1)) {
          onValueChange(
            (Array.isArray(selectedValue) ? selectedValue : []).filter(
              (v) => v !== value
            )
          );
        }
      } else {
        onValueChange([
          ...(Array.isArray(selectedValue) ? selectedValue : []),
          value,
        ]);
      }
    }
  }, [type, isOpen, collapsible, value, selectedValue, onValueChange, disabled]);

  const itemContextValue = React.useMemo(
    () => ({ value, isOpen, toggle, disabled }),
    [value, isOpen, toggle, disabled]
  );

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <Collapsible
        open={isOpen}
        onOpenChange={() => toggle()}
        disabled={disabled}
        className={cn("accordion-item", className)}
        {...props}
      >
        {children}
      </Collapsible>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, disabled } = useAccordionItemContext();

  return (
    <CollapsibleTrigger
      className={cn("accordion-trigger", className)}
      disabled={disabled}
      {...props}
    >
      {children}
      <svg
        className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </CollapsibleTrigger>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  forceMount?: boolean;
}

export function AccordionContent({
  children,
  className,
  forceMount,
  ...props
}: AccordionContentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <CollapsibleContent
      className={cn("accordion-content", className)}
      forceMount={forceMount}
      {...props}
    >
      {children}
    </CollapsibleContent>
  );
}

export {
  Accordion as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content
};