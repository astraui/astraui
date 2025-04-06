"use client";

import * as React from "react";
import { cn } from '@/lib/utils';

interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  onOpenChange: () => { },
});

const useCollapsibleContext = () => React.useContext(CollapsibleContext);

export function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  disabled,
  children,
  className,
  ...props
}: CollapsibleProps & Omit<React.HTMLAttributes<HTMLDivElement>, "defaultOpen" | "onOpenChange">) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const onOpenChange = React.useCallback((value: boolean) => {
    if (disabled) return;

    if (!isControlled) {
      setUncontrolledOpen(value);
    }

    controlledOnOpenChange?.(value);
  }, [isControlled, controlledOnOpenChange, disabled]);

  const contextValue = React.useMemo(
    () => ({ open, onOpenChange, disabled }),
    [open, onOpenChange, disabled]
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      <div
        className={cn("collapsible", {
          "collapsible-disabled": disabled
        }, className)}
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleTrigger({
  asChild = false,
  children,
  className,
  ...props
}: CollapsibleTriggerProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">) {
  const { open, onOpenChange, disabled } = useCollapsibleContext();

  const Component = asChild ? React.Fragment : "button";
  const buttonProps = asChild ? {} : {
    type: "button",
    className: cn("collapsible-trigger", className),
    onClick: () => onOpenChange(!open),
    "aria-expanded": open,
    disabled,
    "data-state": open ? "open" : "closed",
    "data-disabled": disabled ? "" : undefined,
    ...props
  };

  // Fixed TypeScript error here
  return React.createElement(Component, buttonProps, children);
}

// Define a type for children that can be a function
type CollapsibleContentChildrenFunction = (props: { open: boolean }) => React.ReactNode;

interface CollapsibleContentProps {
  asChild?: boolean;
  forceMount?: boolean;
  // Update the children type to allow function that receives open state
  children: React.ReactNode | CollapsibleContentChildrenFunction;
  className?: string;
}

export function CollapsibleContent({
  asChild = false,
  forceMount,
  children,
  className,
  ...props
}: CollapsibleContentProps & React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useCollapsibleContext();

  if (!forceMount && !open) {
    return null;
  }

  const Component = asChild ? React.Fragment : "div";
  const contentProps = asChild ? {} : {
    className: cn(
      "collapsible-content",
      {
        "collapsible-content-open": open,
        "collapsible-content-closed": !open,
      },
      className
    ),
    "data-state": open ? "open" : "closed",
    "aria-hidden": !open,
    ...props
  };

  // Use React.createElement to avoid TypeScript errors with JSX
  return React.createElement(
    Component,
    contentProps,
    typeof children === "function"
      ? (children as CollapsibleContentChildrenFunction)({ open })
      : children
  );
}

export {
  Collapsible as Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content
};