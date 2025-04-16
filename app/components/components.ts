import React from "react";
import Button from "@/components/astra/Button"
import Input from "@/components/astra/Input"

interface ComponentItem {
  preview: React.ReactNode;
  name: string;
  desc: string;
  className?: string;
  link: string;
}

// Define the individual components at the top
const button = React.createElement(Button);
const input = React.createElement(Input);

// Use the components in the array
const components: ComponentItem[] = [
  {
    preview: button,
    name: "Button",
    desc: "A sleek, customizable button component with variants, sizes, and icons for consistent UI design.",
    link: "/components/button"
  },
  {
    preview: input,
    name: "Input",
    desc: "A sleek, customizable input component designed for building responsive and accessible forms with ease.",
    link: "/components/input"
  }
];

export default components;