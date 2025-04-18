import React from "react";
import { cn } from "@/lib/utils"

interface RadioProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Radio: React.FC<RadioProps> = ({
    onChange,
    id,
    name,
    disabled = false,
    className,
    children = "Radio"
}) => {
    return (
        <aside className="flex gap-1 justify-center items-center">
            <input
                name={name}
                type="radio"
                onChange={onChange}
                id={id}
                disabled={disabled}
                className={cn(
                    "accent-black dark:accent-neutral-400 py-2.5 px-3.5 rounded-lg",
                    className
                )}
            />
            <p
            className={cn(
                "text-base md:text-lg tracking-tight w-full"
            )}
            >
                {children}
            </p>
        </aside>
    );
};

export default Radio;