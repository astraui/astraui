import React from "react";
import Button from "@/components/astra/Button";
import Input from "@/components/astra/Input";
import Badge from "@/components/astra/Badge";
import CommandLine from "@/components/astra/CommandLine";
import Textarea from "@/components/astra/Textarea";
import CodeBlock from "@/components/astra/CodeBlock";
import Checkbox from "@/components/astra/Checkbox";
import Radio from "@/components/astra/Radio";
import Switch from "@/components/astra/Switch";
import Dropdown from "@/components/astra/Dropdown";
import Avatar from "@/components/astra/Avatar";
import Star from "@/components/astra/Star";
import Navbar from "@/components/astra/Navbar";
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/astra/Card";
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
const checkbox = React.createElement(Checkbox);
const radio = React.createElement(Radio);
const switchComp = React.createElement(Switch);
const dropdown = React.createElement(Dropdown);
const avatar = React.createElement(Avatar);
const star = React.createElement(Star);
const navbar = React.createElement(Navbar);
const card = React.createElement(
  Card,
  null,
  React.createElement(CardImage, {
    src: "/desktop.png",
    width: 400,
    height: 200,
    alt: "Example",
  }),
  React.createElement(
    CardHeader,
    null,
    React.createElement(CardTitle, null, "Card Title"),
    React.createElement(
      CardDescription,
      null,
      "This is a description of the card content"
    )
  ),
  React.createElement(
    CardContent,
    null,
    React.createElement("div", null, "Main content goes here")
  ),
  React.createElement(
    CardFooter,
    null,
    React.createElement(Button, null, "Action")
  )
);

// Use the components in the array
const components: ComponentItem[] = [
  {
    preview: button,
    name: "Button",
    desc: "A sleek, customizable button component with variants, sizes, and icons for consistent UI design.",
    link: "/components/button",
  },
  {
    preview: input,
    name: "Input",
    desc: "A sleek, customizable input component designed for building responsive and accessible forms with ease.",
    link: "/components/input",
  },
  {
    preview: badge,
    name: "Badge",
    desc: "A compact, attention-grabbing badge component for status indicators, counts, or labels.",
    link: "/components/badge",
  },
  {
    preview: commandLine,
    name: "Command line",
    desc: "Reusable CLI component to display terminal commands or code snippets in docs or user interfaces.",
    link: "/components/command-line",
  },
  {
    preview: textArea,
    name: "Text area",
    desc: "A sleek, customizable text area component designed for building responsive and accessible forms with ease.",
    link: "/components/text-area",
  },
  {
    preview: codeBlock,
    name: "Code block",
    desc: "Reusable component to display formatted code snippets with syntax highlighting in documentation or user interfaces.",
    link: "/components/code-block",
  },
  {
    preview: checkbox,
    name: "Checkbox",
    desc: "A versatile, accessible checkbox component perfect for seamless form building and custom interfaces.",
    link: "/components/checkbox",
  },
  {
    preview: radio,
    name: "Radio",
    desc: "A sleek, customizable radio component designed for building responsive and accessible forms with ease.",
    link: "/components/radio",
  },
  {
    preview: switchComp,
    name: "Switch",
    desc: "A sleek, customizable switch component designed for building responsive and accessible forms with ease.",
    link: "/components/switch",
  },
  {
    preview: dropdown,
    name: "Dropdown",
    desc: "A flexible menu component for selecting options, supporting custom labels, disabled state, and required fields.",
    link: "/components/dropdown",
  },
  {
    preview: avatar,
    name: "Avatar",
    desc: "A versatile component for displaying user avatars with support for images or fallback initials when no image is available.",
    link: "/components/avatar",
  },
  {
    preview: star,
    name: "Star",
    desc: "A customizable rating component that allows users to toggle favorites or provide visual feedback through interactive star icons.",
    link: "/components/star",
  },
  {
    preview: navbar,
    name: "Navbar",
    desc: "A responsive navigation component with a modern glassmorphism design that adapts to both desktop and mobile views, featuring a hamburger menu for smaller screens.",
    link: "/components/navbar",
  },
  {
    preview: card,
    name: "Card",
    desc: "A minimalist and versatile card component that supports images, headers, content, and footers elegantly.",
    link: "/components/card",
  },
];

export default components;
