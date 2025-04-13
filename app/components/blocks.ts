import React from "react";

// Import the custom SeeComponent
import Blocks from "@/components/project/landing/Blocks"

interface ComponentItem {
  preview: React.ReactNode;
  name: string;
  desc: string;
  className?: string;
  link: string;
}

// Define the individual components at the top
const signUp = React.createElement(Blocks);

// Use the components in the array
const components: ComponentItem[] = [
  {
    preview: signUp,
    name: "Sign up",
    desc: "Fast, minimal sign-up block for developers who value speed.",
    link: "/sign-up",
  }
];

export default components;