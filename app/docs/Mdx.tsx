import React from "react";
import Link from "next/link";

interface MdxProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    link: string;
    className?: string;
}

const Mdx: React.FC<MdxProps> = ({ icon, title, desc, link, className }) => {
    return (
        <Link href={link}>
            <section className={`card ${className}`}>
                <div className="icon-container mb-1">{icon}</div>
                <strong><p className="w-full">{title}</p></strong>
                <p className="w-full">{desc}</p>
            </section>
        </Link>
    );
};

export default Mdx;