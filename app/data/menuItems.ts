import { v4 as uuidv4 } from 'uuid';

interface MenuLink {
  href: string;
  text: string;
}

interface MenuItem {
  id: string;
  title: string;
  links: MenuLink[];
}

const menuItems: MenuItem[] = [
  {
    id: uuidv4(),
    title: "Documentation",
    links: [
      { href: "/docs/", text: "Getting started" },
      { href: "/docs/changelog", text: "Changelog" }
    ]
  },
  {
    id: uuidv4(),
    title: "Components",
    links: [
      { href: "../components", text: "See all" },
      { href: "../docs/cli", text: "CLI" }
    ]
  },
  {
    id: uuidv4(),
    title: "Discover",
    links: [
      { href: "/discover/featured", text: "Featured" },
      { href: "/discover/tips", text: "Tips" }
    ]
  },
  {
    id: uuidv4(),
    title: "Contact",
    links: [
      { href: "/#contact", text: "Feedback" },
      { href: "mailto:hello@egeuysal.com", text: "Support" }
    ]
  },
  {
    id: uuidv4(),
    title: "Links",
    links: [
      { href: "/#newsletter", text: "Newsletter" },
      { href: "https://github.com/astraui/astraui", text: "GitHub" },
    ]
  }
];

export default menuItems;