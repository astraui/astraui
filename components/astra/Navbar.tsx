"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiMenu } from "react-icons/hi";

interface NavbarProps {
  className?: string;
  logo: string;
  alt: string;
  navItems?: { label: string; href: string }[];
}

interface NavListProps {
  items: { label: string; href: string }[];
  isMobile?: boolean;
}

const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "Documentation", href: "/docs" },
];

export const NavList: React.FC<NavListProps> = ({
  items,
  isMobile = false,
}) => {
  return (
    <ul
      className={cn(
        "flex gap-6 items-center",
        isMobile
          ? "flex-col absolute top-16 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 w-48"
          : "hidden md:flex"
      )}
    >
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className="font-bold text-black dark:text-white flex hover:opacity-80 transition duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar: React.FC<NavbarProps> = ({
  className,
  logo = "/logos/header-logo.svg",
  alt = logo,
  navItems = defaultNavItems,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "flex items-center justify-between border border-neutral-200 dark:border-neutral-800 p-3.5 rounded-lg w-full relative bg-white/90 dark:bg-black/90 backdrop-blur-lg",
        className
      )}
    >
      <section>
        <Image
          src={logo || "#"}
          height={24}
          width={24}
          alt={alt}
          className={cn(
            "dark:invert flex hover:opacity-80 transition duration-200 cursor-pointer",
            className
          )}
        />
      </section>
      <section className="flex items-center justify-center">
        <NavList items={navItems} />
        <button
          className="md:hidden text-black dark:text-white hover:opacity-80 transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <HiMenu size={28} />
        </button>
      </section>
      {isMenuOpen && <NavList items={navItems} isMobile />}
    </nav>
  );
};

export default Navbar;
