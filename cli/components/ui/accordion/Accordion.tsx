"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"; // Fixed import path
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../collapsible"; 
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* ----------------- Types ----------------- */
type AccordionItemValue = string | number;

interface AccordionContextValue {
  value: AccordionItemValue | AccordionItemValue[] | undefined;
  onValueChange: (value: AccordionItemValue | AccordionItemValue[] | undefined) => void;
  isMultiple: boolean;
  openItems: AccordionItemValue[];
  toggleItem: (itemValue: AccordionItemValue) => void;
}

interface AccordionItemContextValue {
  value: AccordionItemValue;
  isOpen: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);
const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within an Accordion component"
    );
  }
  return context;
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionHeader/AccordionTrigger/AccordionContent must be used within an AccordionItem"
    );
  }
  return context;
}

/* ----------------- Variants ----------------- */
const accordionVariants = cva("space-y-1.5", {
  variants: {
    variant: {
      default: "rounded-md",
      ghost: "",
      bordered: "border border-border rounded-md p-1",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const accordionItemVariants = cva("overflow-hidden", {
  variants: {
    variant: {
      default: "border border-border rounded-md",
      ghost: "border-none",
      bordered: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "px-4",
        ghost: "px-0",
        bordered: "px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionContentVariants = cva("", {
  variants: {
    variant: {
      default: "px-4 pb-4 pt-0",
      ghost: "px-0 pb-4 pt-0",
      bordered: "px-4 pb-4 pt-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* ----------------- Components ----------------- */
type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  value?: AccordionItemValue | AccordionItemValue[];
  defaultValue?: AccordionItemValue | AccordionItemValue[];
  onValueChange?: (value: AccordionItemValue | AccordionItemValue[] | undefined) => void;
  collapsible?: boolean;
  variant?: any;
  size?: any;
};

/**
 * The root component that contains all accordion items.
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
    type = "single",
    value,
    defaultValue,
    onValueChange,
    collapsible = false,
    className,
    variant,
    size,
    children,
    ...props
  }, ref) => {
    const isMultiple = type === "multiple";
    
    // Fixed state initialization to avoid type errors (line 143)
    const [openItems, setOpenItems] = React.useState<AccordionItemValue[]>(() => {
      // Handle defaultValue properly with explicit typing
      if (defaultValue === undefined) {
        return [];
      }
      
      if (Array.isArray(defaultValue)) {
        // Filter out any non-string/non-number values that might be in the array
        return defaultValue.filter(
          (item): item is AccordionItemValue => 
            typeof item === 'string' || typeof item === 'number'
        );
      }
      
      // If it's a single value, make sure it's a valid AccordionItemValue
      if (typeof defaultValue === 'string' || typeof defaultValue === 'number') {
        return [defaultValue];
      }
      
      return [];
    });

    // Handle controlled component - similarly fixing type issues
    React.useEffect(() => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          // Filter out any non-string/non-number values
          setOpenItems(value.filter(
            (item): item is AccordionItemValue => 
              typeof item === 'string' || typeof item === 'number'
          ));
        } else if (typeof value === 'string' || typeof value === 'number') {
          setOpenItems([value]);
        } else {
          setOpenItems([]);
        }
      }
    }, [value]);

    const toggleItem = React.useCallback(
      (itemValue: AccordionItemValue) => {
        setOpenItems((prevItems) => {
          const isOpen = prevItems.includes(itemValue);

          let newItems: AccordionItemValue[];

          if (isMultiple) {
            newItems = isOpen
              ? prevItems.filter((id) => id !== itemValue)
              : [...prevItems, itemValue];
          } else {
            newItems = isOpen && collapsible ? [] : [itemValue];
          }

          // Call the onValueChange handler for controlled components
          if (onValueChange) {
            onValueChange(isMultiple ? newItems : newItems.length > 0 ? newItems[0] : undefined);
          }

          return newItems;
        });
      },
      [isMultiple, collapsible, onValueChange]
    );

    // Fixed: Create a default no-op function for onValueChange if it's undefined
    const handleValueChange: AccordionContextValue["onValueChange"] = React.useCallback(
      (newValue) => {
        if (onValueChange) {
          onValueChange(newValue);
        }
      },
      [onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{
          value: isMultiple ? openItems : openItems[0],
          onValueChange: handleValueChange,
          isMultiple,
          openItems,
          toggleItem,
        }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

/**
 * The individual accordion item component.
 */
type AccordionItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "value"> & {
  value: AccordionItemValue;
  variant?: any;
  disabled?: boolean;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, variant, children, ...props }, ref) => {
    const { openItems } = useAccordionContext();
    const isOpen = openItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn(
            accordionItemVariants({ variant }),
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

/**
 * The header component that contains the accordion trigger.
 */
const AccordionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex", className)}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionHeader.displayName = "AccordionHeader";

/**
 * The trigger button that controls the accordion item's open/closed state.
 */
type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: any;
  hideIcon?: boolean;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, variant, hideIcon = false, ...props }, ref) => {
    const { toggleItem } = useAccordionContext();
    const { value, isOpen } = useAccordionItemContext();

    return (
      <AccordionHeader>
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          className={cn(accordionTriggerVariants({ variant }), className)}
          onClick={() => toggleItem(value)}
          {...props}
        >
          {children}
          {!hideIcon && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          )}
        </button>
      </AccordionHeader>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

/**
 * The content component that appears when the accordion item is open.
 */
type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: any;
  forceMount?: boolean;
  animateOpacity?: boolean;
  duration?: number;
};

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({
    className,
    children,
    variant,
    forceMount,
    animateOpacity = true,
    duration = 0.2,
    ...props
  }, ref) => {
    const { isOpen } = useAccordionItemContext();

    return (
      <Collapsible open={isOpen}>
        <CollapsibleContent
          ref={ref}
          forceMount={forceMount}
          animateOpacity={animateOpacity}
          duration={duration}
          className={cn(accordionContentVariants({ variant }), className)}
          {...props}
        >
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

// Export all components
export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
};