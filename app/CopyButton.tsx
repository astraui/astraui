"use client";

import React from "react";
import { GoCommandPalette } from "react-icons/go";
import { toast, Toaster } from "sonner";

export const CopyCommandButton = () => {
  const copyTextToClipboard = async (text: string) => {
    // Try using the Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error("Clipboard API error:", err);
        // Fall back to document.execCommand method
      }
    }

    // Fallback for older browsers or non-secure contexts
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        return true;
      } else {
        console.error("execCommand copy failed");
        return false;
      }
    } catch (err) {
      console.error("Copy fallback error:", err);
      return false;
    }
  };

  const handleCopy = async () => {
    const command = "pnpm dlx astui@latest add {x}";

    try {
      const success = await copyTextToClipboard(command);

      if (success) {
        toast("Command copied to clipboard", {
          duration: 3000,
        });
      } else {
        throw new Error("Copy operation failed");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy command", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <button
        className="btn-2 lg:col-span-3 flex items-center justify-center gap-3"
        onClick={handleCopy}
        type="button"
      >
        <GoCommandPalette className="stroke-2" />
        <code>pnpm dlx astui@latest add {"{x}"}</code>
      </button>
      <Toaster
        toastOptions={{
          className: "toaster-element",
        }}
      />
    </>
  );
};

export default CopyCommandButton;