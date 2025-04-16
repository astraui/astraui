"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  console.log("Current theme:", theme); // Debug: Log the current theme

  return (
    <Sonner
      {...props}
      className="toaster"
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        className: `
          border
          bg-white text-black border-snow 
          dark:bg-black dark:text-white dark:border-charcoal`,
      }}
    />
  );
};

export { Toaster };