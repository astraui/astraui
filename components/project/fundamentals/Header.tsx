"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import menuItems from '../../../app/menuItems'

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const date = new Date();
  const year = date.getFullYear();

  // Control body scroll when menu is open and detect scroll for border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center w-full ">
      <motion.div className="relative w-[90vw] md:w-[95vw]">
        <motion.header
          className="backdrop-blur-lg 
bg-white/75 dark:bg-black/75 py-3 rounded-lg flex justify-between relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <aside className="flex gap-6 items-center">
            <Link href="/" className="flex items-center">
              <Image
                width={20}
                height={20}
                className="ml-4 transition hover:opacity-75 dark:invert"
                alt="Logo"
                src="/logos/header-logo.svg"
              />
            </Link>
            <p className="font-bold hidden md:flex">Astra UI</p>
          </aside>
          <NavigationMenu className="items-center justify-center">
            <NavigationMenuList className="font-bold text-black dark:text-white flex">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.id} className="hidden md:flex">
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.links.map((link) => (
                      <NavigationMenuLink key={link.href} href={link.href}>
                        {link.text}
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden mr-4"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <IoIosClose size={28} className="text-black dark:text-white" />
              ) : (
                <RxHamburgerMenu size="28" className="text-black dark:text-white" />
              )}
            </button>
          </NavigationMenu>

          {/* Simplified unified border animation */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                className="absolute inset-0 rounded-lg border dark:border-[#2e2e2e] border-[#F2F2F2] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut"
                }}
              />
            )}
          </AnimatePresence>
        </motion.header>
      </motion.div>

      {/* Mobile Menu with faster animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-black z-50 md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-6 border-b dark:border-[#2e2e2e] border-[#f2f2f2]">
              <Link href="/" className="flex items-center">
                <Image
                  width={20}
                  height={20}
                  className="transition hover:opacity-75 dark:invert"
                  alt="Logo"
                  src="/logos/header-logo.svg"
                  onClick={() => setMobileMenuOpen(false)}
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-black dark:text-white text-3xl"
                aria-label="Close menu"
              >
                <IoIosClose />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
              <div className="w-full">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full [&_h3]:w-full [&_button]:flex-row [&_button]:items-center [&_svg]:ml-1"
                >
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="w-full"
                    >
                      <AccordionItem value={item.id} className="border-b dark:border-[#2e2e2e] border-[#f2f2f2] w-full">
                        <AccordionTrigger className="font-bold text-2xl text-black dark:text-white py-4 w-full text-center flex justify-center">
                          <div className="flex items-center justify-center">
                            {item.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-center w-full">
                          <div className="flex flex-col items-center justify-center w-full">
                            {item.links.map((link, j) => (
                              <motion.div
                                key={link.href}
                                className="w-full text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: j * 0.03 }}
                              >
                                <Link
                                  href={link.href}
                                  className="py-3 inline-block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors w-full"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {link.text}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="py-4 w-full text-center text-black dark:text-white border-t border-[#f2f2f2] dark:border-[#2e2e2e]">
              <p className="font-medium w-full text-sm">&copy; {year} Astra UI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
