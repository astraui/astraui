import React from "react";
import SeeComponent from "./SeeComponent";

interface ComponentItem {
  preview: React.ReactNode;
  name: string;
  desc: string;
  className?: string;
  link: string;
}

// Define the individual components at the top
const samplePreview1 = React.createElement(SeeComponent);

// Use the components in the array
const components: ComponentItem[] = [
  {
    preview: samplePreview1,
    name: "Component One",
    desc: "This is the first sample component.",
    className: "component-one",
    link: "/one"
  }
];

export default components;