import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className: string;
  children: React.ReactNode;
}
interface FooterSectionProps extends FooterProps {
  title: string;
}

export const FooterContent: React.FC<FooterProps> = ({
  className,
  children,
}) => {
  return (
    <nav
      className={cn(
        "w-full text-black dark:text-white tracking-tight",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const FooterSection: React.FC<FooterSectionProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <section className={cn("w-full flex flex-col gap-2", className)}>
      <h3
        className={cn(
          "text-lg text-black dark:text-white font-bold tracking-tight w-full transition duration-200 hover:opacity-80",
          className
        )}
      >
        {title}
      </h3>
      {children}
    </section>
  );
};

export const Footer: React.FC<FooterProps> = ({ className, children }) => {
  return (
    <footer
      className={cn(
        "border border-neutral-200 dark:border-neutral-800 rounded-lg grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4 w-full",
        className
      )}
    >
      {children}
    </footer>
  );
};
