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
            width={96}
            height={96}
        />
    );
};

export default Framework;