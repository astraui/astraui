"use client";

import { useEffect } from "react";

interface JsonLdProps {
  jsonLdData: {
    "@context": string;
    "@type": string;
    name: string;
    image: string;
    description: string;
    [key: string]: unknown;  // Allow for other keys
  };
}

const JsonLd = ({ jsonLdData }: JsonLdProps) => {
  useEffect(() => {
    // Remove any existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add the new script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
      // Find and remove our script on unmount
      const ourScript = document.querySelector(`script[type="application/ld+json"]`);
      if (ourScript) document.head.removeChild(ourScript);
    };
  }, [jsonLdData]);

  return null;
};

export default JsonLd;