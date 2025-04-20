'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { FaRegStar, FaStar } from "react-icons/fa";

interface StarProps {
  initialValue?: boolean;
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const Star: React.FC<StarProps> = ({
  initialValue = false,
  className,
  size = 32,
  color = "text-black dark:text-white",
  onClick,
}) => {
  const [isStarred, setIsStarred] = React.useState(initialValue);

  const handleClick: () => void = () => {
    if (onClick) {
      onClick();
    }
    setIsStarred(!isStarred);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "transition duration-200 hover:opacity-80",
        className
      )}
      aria-label={isStarred ? "Unstar" : "Star"}
    >
      {isStarred ? (
        <FaStar 
          className={color} 
          style={{ width: size, height: size }}
        />
      ) : (
        <FaRegStar 
          className={color} 
          style={{ width: size, height: size }}
        />
      )}
    </button>
  );
};

export default Star;