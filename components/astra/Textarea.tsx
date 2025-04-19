"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  className?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  "aria-label"?: string;
  "aria-describedby"?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      placeholder = "Text area",
      maxLength,
      minLength,
      required = false,
      className,
      value,
      defaultValue,
      onChange,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      disabled,
      readOnly,
    },
    ref
  ) => {
    return (
      <textarea
        id={id}
        name={name}
        ref={ref}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        aria-label={ariaLabel || placeholder}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cn(
          "text-sm md:text-base tracking-tight w-full flex flex-col py-2.5 px-3.5 rounded-lg placeholder:text-black/50 dark:placeholder:text-white/50 text-black dark:text-white caret-black dark:caret-white border border-neutral-200 dark:border-neutral-800  h-24 outline-none transition-colors focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
