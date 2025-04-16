import React from "react";
import { cn } from "@/lib/utils"

interface InputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'checkbox' | 'radio' | 'range' | 'file';
    id?: string | number;
    placeholder?: string | number;
    value?: string | number;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    onChange,
    type,
    id,
    placeholder = "Placeholder",
    value,
    name,
    disabled = false,
    required = false,
    className
}) => {
    return (
        <input
            type={type}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required={required}
            className={cn(
                "text-sm md:text-base tracking-tight w-full flex flex-col py-2.5 px-3.5 rounded-lg placeholder:text-black/50  dark:placeholder:text-white/50 text-black dark:text-white caret-black dark:caret-white border border-neutral-200 dark:border-neutral-800 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] accent-black dark:accent-neutral-400",
                className
            )}>
        </input>
    );
};

export default Input