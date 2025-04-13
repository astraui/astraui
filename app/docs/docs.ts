import React from 'react';
import { IoMdDownload, IoMdBrush, IoMdSettings } from 'react-icons/io';
import { FiPackage, FiCode, FiLayout } from 'react-icons/fi';
import { BsStack, BsBoxes } from 'react-icons/bs';
import { MdOutlineDesignServices } from 'react-icons/md';

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
const installIcon = React.createElement(IoMdDownload, { size: iconSize });
const componentsIcon = React.createElement(FiPackage, { size: iconSize });
const styleIcon = React.createElement(IoMdBrush, { size: iconSize });
const codeIcon = React.createElement(FiCode, { size: iconSize });
const layoutIcon = React.createElement(FiLayout, { size: iconSize });
const blockIcon = React.createElement(BsStack, { size: iconSize });
const systemIcon = React.createElement(IoMdSettings, { size: iconSize });
const customizeIcon = React.createElement(MdOutlineDesignServices, { size: iconSize });
const libraryIcon = React.createElement(BsBoxes, { size: iconSize });

// Define the array of documentation items
const docs: DocItem[] = [
  {
    icon: installIcon,
    title: "Installation   ",
    desc: "Get started by installing the library package now.          ",
    link: "/docs/installation"
  },
  {
    icon: componentsIcon,
    title: "Components    ",
    desc: "Explore the complete list of reusable UI components.       ",
    link: "/docs/components",
    className: "components-card"
  },
  {
    icon: blockIcon,
    title: "Building Blocks",
    desc: "Discover block tools to build advanced custom interfaces.  ",
    link: "/docs/building-blocks"
  },
  {
    icon: styleIcon,
    title: "Styling       ",
    desc: "Learn styling techniques and customize your components.    ",
    link: "/docs/styling",
    className: "styling-card"
  },
  {
    icon: layoutIcon,
    title: "Layouts       ",
    desc: "Create flexible layouts with the provided layout tools.    ",
    link: "/docs/layouts"
  },
  {
    icon: systemIcon,
    title: "Design System ",
    desc: "Understand design principles and token implementation.     ",
    link: "/docs/design-system",
    className: "system-card"
  },
  {
    icon: customizeIcon,
    title: "Customization  ",
    desc: "Learn how to customize components for your requirements.  ",
    link: "/docs/customization"
  },
  {
    icon: codeIcon,
    title: "API Reference ",
    desc: "Access API details like props, methods, and definitions.   ",
    link: "/docs/api-reference"
  },
  {
    icon: libraryIcon,
    title: "Library Info  ",
    desc: "Understand the purpose and structure of the library.       ",
    link: "/docs/library-info"
  },
  {
    icon: React.createElement(IoMdDownload, { size: iconSize }),
    title: "Quick Start   ",
    desc: "Follow quick and simple steps to dive into the library.    ",
    link: "/docs/quick-start"
  },
  {
    icon: React.createElement(FiPackage, { size: iconSize }),
    title: "Changelog     ",
    desc: "See the history of changes and updates to the library.     ",
    link: "/docs/changelog"
  },
  {
    icon: React.createElement(MdOutlineDesignServices, { size: iconSize }),
    title: "Contributing  ",
    desc: "Learn how to contribute to the library as a developer.     ",
    link: "/docs/contributing"
  }
];

export default docs;