import React from 'react';
import Link from "next/link";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#ffffff] dark:bg-[#000000] border border-[#f2f2f2] dark:border-[#2e2e2e] rounded-xl py-8 px-6 mt-auto">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-2">
                        <h6 className="footer-text font-bold">
                            Astra UI
                        </h6>

                        <p className="footer-text w-full">
                            Design. Build. Empower.
                        </p>

                        <p className="footer-text">
                            &copy; {currentYear} Astra UI
                        </p>
                    </div>

                    <div>
                        <h6 className="footer-text font-bold">
                            Resources
                        </h6>

                        <nav className="mt-3">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link href="/docs/terms-of-service.pdf" className="footer-text">
                                        Terms of service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/getting-started" className="footer-text">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/privacy-policy.pdf" className="footer-text">
                                        Privacy policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="mailto:hello@egeuysal.com" className="footer-text">
                                        Contact us
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h6 className="footer-text font-bold">
                            Connect
                        </h6>

                        <address className="mt-3 not-italic">
                            <div className="flex items-center h-full gap-4">
                                <Link
                                    href="https://www.astraui.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Website"
                                >
                                    <FaGlobeAmericas size="28" className="text-black dark:text-white"/>
                                </Link>
                                <Link
                                    href="https://github.com/astraui/astraui"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <IoLogoGithub size="28" className="text-black dark:text-white"/>
                                </Link>
                                <Link
                                    href="mailto:hello@egeuysal.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Email"
                                >
                                    <IoMail size="30" className="text-black dark:text-white"/>
                                </Link>
                            </div>
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;