import React from "react";
import Image from 'next/image';

interface BrandCardProps {
    image: string;
    desc: string;
    className?: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ image, desc, className }) => {
    return (
        <figure className={`${className} flex flex-col gap-2`}>
            <Image
                src={image}
                alt={`${desc} description`}
                width={1024}
                height={512}
                className="rounded-xl border border-snow dark:border-charcoal"
            />
            <figcaption className="text-sm md:text-base tracking-tight opacity-50 text-black dark:text-white lg:w-2/4">{desc}</figcaption>
        </figure>
    );
}

export default BrandCard;