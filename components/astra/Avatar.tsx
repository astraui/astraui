"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  avatar?: string;
  displayName: string;
  size?: number;
  className?: string;
}

interface AvatarFallbackProps {
  initial: string;
  size?: number;
  className?: string;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  initial,
  size = 128,
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-full font-bold transition-all duration-200 hover:grayscale mb-4 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white",
      className
    )}
    style={{
      width: size,
      height: size,
      fontSize: size * 0.33
    }}
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
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const initial = displayName?.charAt(0).toUpperCase() || "U";
  
  // Show fallback if avatar is not provided or empty string or image failed to load
  if (!avatar || avatar.trim() === '' || !isImageLoaded) {
    return <AvatarFallback initial={initial} size={size} className={className} />;
  }

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-full mb-4",
        className
      )}
      style={{
        width: size,
        height: size
      }}
    >
      <Image
        src={avatar}
        alt={`${displayName}'s profile picture`}
        width={size}
        height={size}
        className="object-cover transition-all duration-200 hover:grayscale"
        loading="eager"
        fetchPriority="high"
        onError={() => setIsImageLoaded(false)}
      />
    </div>
  );
};

export default Avatar;