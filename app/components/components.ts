import React from "react";
import Button from "@/components/astra/Button"
import Input from "@/components/astra/Input"
import Badge from "@/components/astra/Badge"
import CommandLine from '@/components/astra/CommandLine';
import Textarea from '@/components/astra/Textarea';
import CodeBlock from "@/components/astra/CodeBlock"

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
const badge = React.createElement(Badge);
const commandLine = React.createElement(CommandLine);
const textArea = React.createElement(Textarea);
const codeBlock = React.createElement(CodeBlock);

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
  },
  {
    preview: badge,
    name: "Badge",
    desc: "A compact, attention-grabbing badge component for status indicators, counts, or labels.",
    link: "/components/badge"
  },
  {
    preview: commandLine,
    name: "Command line",
    desc: "Reusable CLI component to display terminal commands or code snippets in docs or user interfaces.",
    link: "/components/command-line"
  },
  {
    preview: textArea,
    name: "Text area",
    desc: "A sleek, customizable text area component designed for building responsive and accessible forms with ease.",
    link: "/components/text-area"
  },
  {
    preview: codeBlock,
    name: "Code block",
    desc: "Reusable component to display formatted code snippets with syntax highlighting in documentation or user interfaces.",
    link: "/components/code-block"
  }
];

export default components;