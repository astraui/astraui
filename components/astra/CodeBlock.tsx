"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaFile } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';
import { IoCodeOutline, IoCheckmark } from 'react-icons/io5';
import { LuCopy } from "react-icons/lu";
import { cn } from '@/lib/utils';

// Map all known abbreviations/extensions to their icon - all in black/white
const languageIconMap: Record<string, React.ReactNode> = {
  html: <FaHtml5 className="text-black dark:text-white" size={16} />,
  css: <FaCss3Alt className="text-black dark:text-white" size={16} />,
  js: <FaJs className="text-black dark:text-white" size={16} />,
  jsx: <FaJs className="text-black dark:text-white" size={16} />,
  javascript: <FaJs className="text-black dark:text-white" size={16} />,
  ts: <SiTypescript className="text-black dark:text-white" size={16} />,
  tsx: <SiTypescript className="text-black dark:text-white" size={16} />,
  typescript: <SiTypescript className="text-black dark:text-white" size={16} />,
  py: <FaPython className="text-black dark:text-white" size={16} />,
  python: <FaPython className="text-black dark:text-white" size={16} />,
  java: <FaJava className="text-black dark:text-white" size={16} />,
  txt: <FaFile className="text-black dark:text-white" size={16} />,
  text: <FaFile className="text-black dark:text-white" size={16} />,
  plaintext: <FaFile className="text-black dark:text-white" size={16} />,
  md: <FaFile className="text-black dark:text-white" size={16} />,
  markdown: <FaFile className="text-black dark:text-white" size={16} />,
  sh: <FaFile className="text-black dark:text-white" size={16} />,
  bash: <FaFile className="text-black dark:text-white" size={16} />,
  shell: <FaFile className="text-black dark:text-white" size={16} />,
};

type CodeBlockProps = {
  code: string;
  language?: string;
  fileName?: string | null;
  className?: string;
  codeClassName?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code = "# Code block",
  language = 'md',
  fileName = "code",
  className,
  codeClassName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if dark mode is enabled
    setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Listen for changes in color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleCopy = async () => {
    if (!isClient) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Memo for performance and to handle both abbreviation and full name
  const langIcon = useMemo(() => {
    const lang = language?.toLowerCase();
    if (lang && languageIconMap[lang]) return languageIconMap[lang];
    // try to match by extension if not found directly
    const ext = lang?.split(/[^a-z]/gi)[0];
    if (ext && languageIconMap[ext]) return languageIconMap[ext];
    return <IoCodeOutline className="text-black dark:text-white" size={16} />;
  }, [language]);

  // Use isDarkMode state to determine the theme instead of the prop
  const prismTheme = isDarkMode ? dracula : oneLight;
  const codeLines = code.split('\n');
  const lineNumbers = Array.from({ length: codeLines.length }, (_, i) => i + 1);

  return (
    <figure className={cn("relative w-full font-geist", className)}>
      <div
        className={cn(
          "rounded-xl overflow-hidden w-full border border-neutral-200 dark:border-neutral-800"
        )}
      >
        {fileName && (
          <figcaption
            className={cn(
              "flex items-center justify-between px-4 py-2.5 border-b border-[#eee] dark:border-neutral-800"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">{langIcon}</div>
              <span className="text-base font-bold text-black dark:text-white">
                {`${fileName}${language ? `.${language}` : ''}`}
              </span>
            </div>
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy code"}
              className={cn(
                "flex items-center transition-all duration-200 hover:opacity-80 text-black dark:text-white"
              )}
              title={copied ? "Copied!" : "Copy code"}
              type="button"
              disabled={!isClient}
            >
              {copied ? (
                <IoCheckmark className="w-4 h-4" />
              ) : (
                <LuCopy className="w-4 h-4" />
              )}
            </button>
          </figcaption>
        )}
        <div className={cn("relative group")}>
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] w-full font-geist",
                codeClassName
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-end pt-5 pb-5 px-3 bg-transparent select-none text-neutral-400 dark:text-neutral-500"
                )}
              >
                {lineNumbers.map(num => (
                  <div
                    key={num}
                    className="leading-[1.5] text-md min-h-[1.5em]"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className="relative flex-1 min-w-0 pt-5 pb-5 pl-0 pr-4">
                {isClient && (
                  <SyntaxHighlighter
                    language={language}
                    style={prismTheme}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: 'inherit',
                      fontFamily: 'inherit'
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: 'inherit'
                      }
                    }}
                    showLineNumbers={false}
                    wrapLongLines={true}
                    lineProps={() => ({
                      style: {
                        whiteSpace: 'pre-wrap',
                        minHeight: '1.5em',
                        marginBottom: 0,
                      }
                    })}
                  >
                    {code}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </div>
          {!fileName && isClient && (
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy code"}
              className={cn(
                "absolute right-2 top-2 transition-all duration-200 hover:opacity-80 text-black dark:text-white"
              )}
              title={copied ? "Copied!" : "Copy code"}
              type="button"
              disabled={!isClient}
            >
              {copied ? (
                <IoCheckmark className="w-5 h-5" />
              ) : (
                <LuCopy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </figure>
  );
};

export default CodeBlock;