"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface BadgeProps {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    children: React.ReactNode;
}

const badgeVariants = cva(
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
                xs: "text-xs py-0.5 px-1.5",
                sm: "text-sm py-1 px-3",
                md: "text-base py-1.5 px-4.5",
                lg: "text-lg py-2 px-6",
                xl: "text-xl py-2.5 px-7.5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

const Badge: React.FC<BadgeProps> = ({
    variant = "primary",
    size = "md",
    className,
    children = "Badge",
}) => {
    return (
        <div
            className={cn(
                badgeVariants({ variant, size }),
                className
            )}
        >
            {children}
        </div>
    );
};

export default Badge;