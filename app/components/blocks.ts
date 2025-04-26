import React from "react";

import Blocks from "@/components/astra/landing/Blocks";
import { Newsletter } from "@/components/astra/landing/Newsletter";

interface ComponentItem {
  preview: React.ReactNode;
  name: string;
  desc: string;
  className?: string;
  link: string;
}

// Define the individual components at the top
const signUp = React.createElement(Blocks);
const newsletter = React.createElement(Newsletter);

// Use the components in the array
const components: ComponentItem[] = [
  {
    preview: signUp,
    name: "Sign up",
    desc: "Fast, minimal sign-up block for developers who value speed.",
    link: "/cmponents/sign-up",
  },
  {
    preview: newsletter,
    name: "Newsletter",
    desc: "Minimal newsletter sign-up with input, button, and smooth layout for quick subscriptions.",
    link: "/components/newsletter",
  },
];

export default components;
