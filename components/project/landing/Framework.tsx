import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface FrameworkProps {
    frameworkImage: string;
}

const Framework: React.FC<FrameworkProps> = ({ frameworkImage }) => {
    return (
        <Image
            src={frameworkImage}
            alt={`${frameworkImage} icon`}
            width={64}
            height={64}
            className={cn(
                "relative dark:invert cursor-pointer overflow-hidden mx-8",
            )}
        />
    );
};

export default Framework;