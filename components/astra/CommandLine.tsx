"use client";

import React, { useState, useEffect } from 'react';
import { LuCopy } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CommandLineProps {
    command: string;
    className?: string;
    language: string;
}

const CommandLine: React.FC<CommandLineProps> = ({
        command = "pnpm dev",
        className = "",
        language = "bash"
    }) => {
    const [copied, setCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if dark mode is enabled
        setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        // Optional: Listen for changes in color scheme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', listener);
        
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    const handleCopy = async () => {
        if (!isClient) return;

        try {
            if (navigator && navigator.clipboard) {
                await navigator.clipboard.writeText(command);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                fallbackCopyTextToClipboard(command);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(command);
        }
    };

    const fallbackCopyTextToClipboard = (text: string) => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;

            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
    };

    return (
        <aside className={cn(
            "flex justify-between items-center text-black dark:text-white border border-neutral-200 rounded-md p-3 px-4 dark:border-neutral-800 font-geist w-full",
            className
        )}>
            <div className="flex-grow overflow-x-auto">
                <SyntaxHighlighter 
                    language={language}
                    style={isDarkMode ? dracula : oneLight}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: 'transparent',
                        fontSize: 'inherit',
                        fontFamily: 'inherit'
                    }}
                    codeTagProps={{style: {fontFamily: 'inherit'} }}
                >
                    {command}
                </SyntaxHighlighter>
            </div>
            <button 
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                type="button"
                disabled={!isClient}
                className="ml-3 flex-shrink-0"
            >
                {copied ? (
                    <IoCheckmark className="text-black dark:text-white" size={18} />
                ) : (
                    <LuCopy className="text-black dark:text-white" size={18} />
                )}
            </button>
        </aside>
    );
}

export default CommandLine;