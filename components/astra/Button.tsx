"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

const buttonVariants = cva(
    "rounded-md font-semibold transition duration-200", 
    {
        variants: {
            variant: {
                primary: "bg-black text-white dark:bg-white dark:text-black hover:opacity-75",
                secondary: "bg-neutral-200 text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 hover:opacity-75",
                outline: "bg-transparent text-black dark:text-white border border-neutral-200 dark:border-neutral-800 hover:opacity-75",
                ghost: "bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
                link: "bg-black text-white dark:bg-white dark:text-black hover:opacity-75 underline",
                destructive: "bg-red-700 text-white dark:bg-red-700 hover:opacity-75",
            },
            size: {
                xs: "text-xs py-1 px-2",
                sm: "text-sm py-1.5 px-3",
                md: "text-base py-2 px-4",
                lg: "text-lg py-2.5 px-5",
                xl: "text-xl py-3 px-6",
            },
            disabled: {
                true: "opacity-75 cursor-not-allowed",
                false: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            disabled: false, // Use boolean here
        },
    }
);

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className,
    children = "Button",
}) => {
    return (
        <button
            className={cn(
                buttonVariants({ variant, size, disabled }), // Pass boolean directly
                className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;