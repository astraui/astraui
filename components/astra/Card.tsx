"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type CardImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
};

export const CardImage: React.FC<CardImageProps> = ({
  src,
  width = 400,
  height = 225,
  alt,
  className,
}) => {
  return (
    <div className={cn("p-4 pb-0", className)}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="object-cover rounded-lg w-full h-full"
      />
    </div>
  );
};

type CardHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
}) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};

type CardTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "font-bold lg:text-lg text-black dark:text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

type CardDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "text-sm lg:text-base text-black dark:text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

type CardContentProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
}) => {
  return <div className={cn("p-4 pt-0", className)}>{children}</div>;
};

type CardFooterProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
}) => {
  return <div className={cn("p-4 pt-0", className)}>{children}</div>;
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "elevated";
  width?: string | number;
  hover?: boolean;
};

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = "default",
  width = "100%",
  hover = true,
}) => {
  return (
    <div
      style={{ width: typeof width === "number" ? `${width}px` : width }}
      className={cn(
        "text-black dark:text-white flex flex-col rounded-lg p-2.5 border border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
};
