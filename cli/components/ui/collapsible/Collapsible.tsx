"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* ----------------- Types ----------------- */
interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "Collapsible compound components must be used within a Collapsible component"
    );
  }
  return context;
}

/* ----------------- Variants ----------------- */
const collapsibleVariants = cva("", {
  variants: {
    variant: {
      default: "overflow-hidden",
      ghost: "overflow-visible",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* ----------------- Components ----------------- */
type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: any;
};

/**
 * The root component for a collapsible section.
 */
const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ defaultOpen = false, open, onOpenChange, className, variant, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    // Use controlled or uncontrolled state
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleOpenChange = React.useCallback(
      (openState: boolean) => {
        if (!isControlled) {
          setInternalOpen(openState);
        }
        onOpenChange?.(openState);
      },
      [isControlled, onOpenChange]
    );

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div
          ref={ref}
          className={cn(collapsibleVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

/**
 * The trigger button for the collapsible section.
 */
const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useCollapsibleContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      className={className}
      onClick={() => onOpenChange(!open)}
      {...props}
    >
      {children}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/**
 * The component that wraps the collapsible content.
 */
type CollapsibleContentProps = React.HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
  animateOpacity?: boolean;
  duration?: number;
};

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, forceMount, animateOpacity = true, duration = 0.2, ...props }, ref) => {
    const { open } = useCollapsibleContext();
    const animationRef = React.useRef<HTMLDivElement>(null);

    // Animation variants for the content
    const variants = {
      hidden: {
        height: 0,
        opacity: animateOpacity ? 0 : 1,
        transition: { duration, ease: "easeInOut" },
      },
      visible: {
        height: "auto",
        opacity: 1,
        transition: {
          height: { duration, ease: "easeInOut" },
          opacity: { duration: animateOpacity ? duration * 0.7 : 0 }
        },
      },
    };

    return (
      <AnimatePresence initial={false}>
        {(forceMount || open) && (
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            exit="hidden"
            variants={variants}
            className="overflow-hidden"
          >
            <div ref={ref} className={cn(className)} {...props}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";

// Export all components
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
};