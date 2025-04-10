import { v4 as uuidv4 } from 'uuid';

// Define types for the menu structure
interface MenuItem {
  id: string;
  title: string;
  links: MenuLink[];
}

interface MenuLink {
  href: string;
  text: string;
}

// Create the menu items with UUID for IDs
const menuItems: MenuItem[] = [
  {
    id: uuidv4(),
    title: "Documentation",
    links: [
      { href: "/docs/getting-started", text: "Getting started" },
      { href: "/docs/changelog", text: "Changelog" }
    ]
  },
  {
    id: uuidv4(),
    title: "Links",
    links: [
      { href: "/links/our-links", text: "Our links" },
      { href: "/#newsletter", text: "Newsletter" }
    ]
  },
  {
    id: uuidv4(),
    title: "Discover",
    links: [
      { href: "/discover/featured-links", text: "Featured links" },
      { href: "/discover/tips", text: "Tips" }
    ]
  },
  {
    id: uuidv4(),
    title: "Create",
    links: [
      { href: "/create/new-links", text: "New links" },
      { href: "/create/new-links#customize", text: "Customize" }
    ]
  },
  {
    id: uuidv4(),
    title: "Contact",
    links: [
      { href: "mailto:hello@egeuysal.com", text: "Support" },
      { href: "/#contact", text: "Feedback" }
    ]
  }
];

export default menuItems;