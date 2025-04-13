import React from 'react';
import { FaPalette, FaCode, FaLayerGroup, FaHistory, FaHandsHelping, FaRocket } from 'react-icons/fa';

import { FaDownload } from "react-icons/fa6";
import { FaPenFancy } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";

// Define the type for a documentation item
interface DocItem {
  icon: React.ReactElement;
  title: string;
  desc: string;
  link: string;
  className?: string;
}

// Define the icon size to be used consistently
const iconSize = 24;

// Create React elements from the imported icons
const installIcon = React.createElement(FaDownload, { size: iconSize });
const componentsIcon = React.createElement(FaPenFancy, { size: iconSize });
const styleIcon = React.createElement(FaPalette, { size: iconSize });
const codeIcon = React.createElement(FaCode, { size: iconSize });
const layoutIcon = React.createElement(FaLayerGroup, { size: iconSize });
const systemIcon = React.createElement(AiFillTool, { size: iconSize });
const customizeIcon = React.createElement(FaWandMagicSparkles, { size: iconSize });
const libraryIcon = React.createElement(FaBook, { size: iconSize });
const changelogIcon = React.createElement(FaHistory, { size: iconSize });
const contributingIcon = React.createElement(FaHandsHelping, { size: iconSize });
const quickStartIcon = React.createElement(FaRocket, { size: iconSize });
const apiIcon = React.createElement(AiFillEye, { size: iconSize });

// Define the array of documentation items
const docs: DocItem[] = [
  {
    icon: installIcon,
    title: "Installation",
    desc: "Learn how to install and set up the library step-by-step.",
    link: "/docs/installation"
  },
  {
    icon: quickStartIcon,
    title: "Getting started",
    desc: "Follow a quick guide to get started with the library easily.",
    link: "/docs/getting-started"
  },
  {
    icon: componentsIcon,
    title: "Components",
    desc: "Browse all reusable UI components and their use cases here.",
    link: "/docs/components",
  },
  {
    icon: layoutIcon,
    title: "Layouts",
    desc: "Explore tools to create flexible and responsive layouts now.",
    link: "/docs/layouts"
  },
  {
    icon: styleIcon,
    title: "Styling",
    desc: "Learn how to style and customize components for your needs.",
    link: "/docs/styling",
  },
  {
    icon: systemIcon,
    title: "CLI",
    desc: "Easily integrate CLI support with customizable UI components.",
    link: "/docs/cli",
  },
  {
    icon: customizeIcon,
    title: "Customization",
    desc: "Discover how to customize components for unique workflows.",
    link: "/docs/customization"
  },
  {
    icon: apiIcon,
    title: "Accessibility",
    desc: "Accessible UI components ensuring usability for diverse audiences.",
    link: "/docs/accessibility"
  },
  {
    icon: libraryIcon,
    title: "Library information",
    desc: "Learn about the library structure and its key functionalities.",
    link: "/docs/library-info"
  },
  {
    icon: changelogIcon,
    title: "Changelog",
    desc: "Review all updates, changes, and bug fixes in the library.",
    link: "/docs/changelog"
  },
  {
    icon: contributingIcon,
    title: "Contributing",
    desc: "Find out how to contribute to the development of the library.",
    link: "/docs/contributing"
  },
  {
    icon: codeIcon,
    title: "Building blocks",
    desc: "Explore basic building blocks for advanced UI development.",
    link: "/docs/building-blocks"
  }
];

export default docs;