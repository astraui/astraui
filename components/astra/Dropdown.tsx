'use client';

import React from 'react'
import { cn } from '@/lib/utils'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options?: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
}

const defaultOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' }
]

const Dropdown: React.FC<DropdownProps> = ({
  options = defaultOptions,
  value = '',
  onChange = () => {},
  label,
  placeholder = 'Options',
  className,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="w-full grid place-items-center">
      {label && (
        <label 
          htmlFor="dropdown" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id="dropdown"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        className={cn(
          'text-sm md:text-base tracking-tight w-full flex flex-col py-2.5 px-3.5 rounded-lg',
          'placeholder:text-black/50 dark:placeholder:text-white/50',
          'text-black dark:text-white',
          'border border-neutral-200 dark:border-neutral-800',
          'disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none text-center',
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown