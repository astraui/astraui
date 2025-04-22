"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Input from "@/components/astra/Input";
import Button from "@/components/astra/Button";

// Zod schema for form validation
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// Types for all components
type NewsletterImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
};

type NewsletterInputProps = {
  placeholder?: string;
  ariaLabel?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type NewsletterButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
};

type NewsletterProps = {
  title?: string;
  description?: string;
  image?: NewsletterImageProps;
  backgroundImage?: string;
  blurBackground?: boolean;
  blurAmount?: string;
  inputProps?: NewsletterInputProps;
  buttonProps?: NewsletterButtonProps;
  onSubmit?: (email: string) => void | Promise<void>;
  layout?: "horizontal" | "vertical";
  className?: string;
  containerClassName?: string;
  formClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  successMessage?: string;
  errorMessage?: string;
};

// Individual components
export const NewsletterImage: React.FC<NewsletterImageProps> = ({
  src,
  width = 400,
  height = 300,
  alt,
  className,
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={cn("object-cover", className)}
    />
  );
};

export const NewsletterInput: React.FC<NewsletterInputProps> = ({
  placeholder = "Enter your email address",
  ariaLabel = "Newsletter signup email",
  required = true,
  className,
  value,
  onChange,
}) => {
  return (
    <Input
      type="email"
      placeholder={placeholder}
      aria-label={ariaLabel}
      required={required}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export const NewsletterButton: React.FC<NewsletterButtonProps> = ({
  children = "Sign up",
  className,
  onClick,
  isLoading = false,
  loadingText = "Submitting...",
}) => {
  return (
    <Button
      className={cn("border-none", className)}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

// Title and Description components with framer-motion animations
export const NewsletterTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "text-2xl font-bold mb-4 text-white text-center w-full",
        className
      )}
    >
      {children}
    </motion.h2>
  );
};

export const NewsletterDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("mb-6 text-white w-full", className)}
    >
      {children}
    </motion.p>
  );
};

// Main Newsletter component
export const Newsletter: React.FC<NewsletterProps> = ({
  title = "Subscribe to our newsletter",
  description = "Get the latest updates and news delivered to your inbox.",
  image,
  backgroundImage = "/changelog/astra-text.png",
  blurBackground = true,
  blurAmount = "8px",
  inputProps = {},
  buttonProps = {},
  onSubmit,
  layout = "vertical",
  className,
  containerClassName,
  formClassName,
  titleClassName,
  descriptionClassName,
  successMessage = "Thank you for subscribing!",
  errorMessage = "Something went wrong. Please try again.",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
      // Extract the first error message
      const error = result.error.errors[0];
      setValidationError(error.message);
      return;
    }

    // Clear any validation errors
    setValidationError("");
    setStatus("loading");

    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      setStatus("success");
      setMessage(successMessage);
      setEmail("");
    } catch {
      // Removed unused 'error' variable to fix ESLint warning
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  return (
    <div
      className={cn(
        "newsletter-container relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800",
        containerClassName
      )}
    >
      {/* Background image with blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: blurBackground ? `blur(${blurAmount})` : "none",
        }}
      ></div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-0"></div>

      <div
        className={cn(
          "newsletter-wrapper relative z-10 p-8 flex items-center justify-center",
          layout === "horizontal" ? "md:flex md:items-center" : "flex flex-col"
        )}
      >
        {image && (
          <div
            className={cn(
              "newsletter-image-container",
              layout === "horizontal" ? "md:w-1/2" : "w-full",
              "flex justify-center"
            )}
          >
            <NewsletterImage {...image} />
          </div>
        )}

        <div
          className={cn(
            "newsletter-content text-center",
            layout === "horizontal" ? "md:w-1/2 md:pl-8" : "w-full mt-6",
            className
          )}
        >
          {title && (
            <NewsletterTitle className={titleClassName}>
              {title}
            </NewsletterTitle>
          )}

          {description && (
            <NewsletterDescription className={descriptionClassName}>
              {description}
            </NewsletterDescription>
          )}

          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 max-w-md mx-auto",
              formClassName
            )}
          >
            <div className="flex-grow">
              <NewsletterInput
                {...inputProps}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationError) setValidationError("");
                }}
              />
              {validationError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-300 text-sm mt-1 text-left w-full"
                >
                  {validationError}
                </motion.p>
              )}
            </div>
            <NewsletterButton
              {...buttonProps}
              isLoading={status === "loading"}
            />
          </form>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-300 w-full"
            >
              {message}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-300 w-full"
            >
              {message}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export a simple pre-configured newsletter for quick use
export const SimpleNewsletter: React.FC<{
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
  backgroundImage?: string;
  blurBackground?: boolean;
  blurAmount?: string;
}> = ({
  onSubmit,
  className,
  backgroundImage,
  blurBackground = true,
  blurAmount = "8px",
}) => {
  return (
    <Newsletter
      title="Stay Updated"
      description="Subscribe to get the latest news and updates."
      onSubmit={onSubmit}
      className={className}
      backgroundImage={backgroundImage}
      blurBackground={blurBackground}
      blurAmount={blurAmount}
    />
  );
};
