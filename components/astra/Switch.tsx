'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type SwitchProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    wrapperClassName?: string;
    trackClassName?: string;
    thumbClassName?: string;
    inputClassName?: string;
    id?: string;
    name?: string;
};

export const switchBase =
    'relative inline-flex h-6 w-10';
export const switchTrack =
    'w-10 h-6 bg-neutral-200 peer-checked:bg-black dark:bg-neutral-500 dark:peer-checked:bg-white rounded-full transition duration-200';
export const switchThumb =
    'absolute top-0.75 left-0.75 w-4.5 h-4.5 bg-white dark:bg-black rounded-full transition duration-200 peer-checked:translate-x-4';
export const switchInput =
    'sr-only peer';

const Switch: React.FC<SwitchProps> = ({
    checked = false,
    onChange,
    disabled = false,
    className,
    wrapperClassName,
    trackClassName,
    thumbClassName,
    inputClassName,
    ...props
}) => {
    const [isChecked, setIsChecked] = React.useState(!checked);

    React.useEffect(() => {
        setIsChecked(!checked);
    }, [checked]);

    const handleChange = (newChecked: boolean) => {
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <div className={cn("inline-block", wrapperClassName)}>
            <label className={cn(
                switchBase,
                disabled && 'opacity-80 cursor-not-allowed',
                "cursor-pointer",
                className
            )}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}
                    onChange={e => handleChange(e.target.checked)}
                    className={cn(switchInput, inputClassName)}
                    {...props}
                />
                <span
                    className={cn(
                        switchTrack,
                        disabled && 'pointer-events-none',
                        trackClassName
                    )}
                />
                <span
                    className={cn(
                        switchThumb,
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-green-500',
                        thumbClassName
                    )}
                />
            </label>
        </div>
    );
};

export default Switch;
