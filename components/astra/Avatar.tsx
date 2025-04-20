import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  avatar?: string;
  displayName: string;
  size?: number;
  className?: string;
}

interface AvatarFallbackProps {
  initial?: string;
  size?: number;
  className?: string;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  initial = "U",
  size = 128,
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-full font-bold transition-all duration-200 hover:grayscale mb-4 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white",
      `!w-[${size}px] !h-[${size}px] !text-[${size * 0.33}px]`,
      className
    )}
    aria-label={`${initial}'s profile initial`}
  >
    {initial}
  </div>
);

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  displayName,
  size = 128,
  className,
}) => {
  const initial = displayName?.charAt(0).toUpperCase() || "U";
  
  if (!avatar) {
    return <AvatarFallback initial={initial} size={size} className={className} />;
  }

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-full mb-4",
        `!w-[${size}px] !h-[${size}px]`,
        className
      )}
    >
      <Image
        src={avatar}
        alt={`${displayName}'s profile picture`}
        fill
        className="object-cover transition-all duration-200 hover:grayscale"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default Avatar;