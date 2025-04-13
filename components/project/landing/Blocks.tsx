"use client";

import React, { useState } from "react";
import { z } from "zod";
import Link from 'next/link';
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

// Import icons
import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

// Define the form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Type for our form data
type FormData = z.infer<typeof formSchema>;

// Reusable Input Component with validation
interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required: boolean;
  className?: string;
}

const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
  className,
}: InputFieldProps) => (
  <div className={cn("gap-2 flex flex-col", className)}>
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className={cn(
        "form-input",
        error ? "border-red-500 focus:ring-red-500" : ""
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500 text-sm w-full mt-1">{error}</p>}
  </div>
);

// Reusable Social Button Component
interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const SocialButton = ({
  icon,
  label,
  href,
  onClick,
  className,
}: SocialButtonProps) => {
  const buttonContent = (
    <button
      className={cn("btn-2 flex items-center gap-2 w-full justify-center transition duration-200 hover:opacity-80", className)}
      aria-label={label}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );

  return href ? <Link href={href}>{buttonContent}</Link> : buttonContent;
};

// Define props for the component
export interface SignUpBlockProps {
  className?: string;
  title?: string;
  subtitle?: string;
  googleAuthUrl?: string;
  githubAuthUrl?: string;
  forgotPasswordUrl?: string;
  loginUrl?: string;
  onSubmit?: (data: FormData) => void;
  backgroundImageLight?: string;
  backgroundImageDark?: string;
  showSocialAuth?: boolean;
  showNameFields?: boolean;
  customValidation?: (data: FormData) => Record<string, string | undefined>;
  formClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  socialButtonClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  layoutClassName?: string;
}

// Define custom CSS properties type
interface CustomCSSProperties extends React.CSSProperties {
  '--bg-dark'?: string;
}

const SignUpBlock = ({
  className,
  title = "Sign up",
  subtitle = "Sign up with your Google or GitHub account.",
  googleAuthUrl = "https://accounts.google.com/",
  githubAuthUrl = "https://github.com/login",
  forgotPasswordUrl = "/#contact",
  loginUrl = "/#contact",
  onSubmit,
  backgroundImageLight = "/logos/star.png",
  backgroundImageDark = "/logos/star-dark.png",
  showSocialAuth = true,
  showNameFields = true,
  customValidation,
  formClassName,
  titleClassName,
  subtitleClassName,
  socialButtonClassName,
  inputClassName,
  buttonClassName,
  layoutClassName,
}: SignUpBlockProps) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Error state
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  // Track form submission attempt
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Map form field names to schema properties
    const fieldMap: Record<string, keyof FormData> = {
      "first-name": "firstName",
      "last-name": "lastName",
      "email": "email",
      "password": "password",
    };
    
    const schemaField = fieldMap[name] || name as keyof FormData;
    
    setFormData((prev) => ({
      ...prev,
      [schemaField]: value,
    }));

    // Clear error for this field if user is typing and form was already submitted
    if (isSubmitted) {
      validateField(schemaField, value);
    }
  };

  // Validate a single field
  const validateField = (field: keyof FormData, value: string) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({ [field]: formSchema.shape[field] });
      fieldSchema.parse({ [field]: value });
      
      // Clear the error if validation passes
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === field);
        setErrors((prev) => ({ 
          ...prev, 
          [field]: fieldError?.message || `${field} is invalid` 
        }));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitted(true);
    
    try {
      // Validate all form data against the schema
      formSchema.parse(formData);
      
      // Apply custom validation if provided
      if (customValidation) {
        const customErrors = customValidation(formData);
        if (Object.values(customErrors).some(error => error !== undefined)) {
          setErrors(prev => ({ ...prev, ...customErrors }));
          return;
        }
      }
      
      // If we get here, form is valid
      console.log("Form submitted successfully:", formData);
      
      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(formData);
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map errors to form fields
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  // Create properly typed style object
  const sectionStyle: CustomCSSProperties = {
    backgroundImage: `url('${backgroundImageLight}')`,
    '--bg-dark': `url('${backgroundImageDark}')`,
  };

  return (
    <section 
      className={cn(
        "rounded-xl bg-muted-light dark:bg-muted-dark bg-contain bg-size-[256px] bg-center bg-no-repeat dark:bg-neutral-900 bg-neutral-100",
        className
      )}
      style={sectionStyle}
    >
      <aside className={cn(
        "bordered flex flex-col gap-4 p-8 rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90",
        layoutClassName
      )}>
        <h2 className={cn("text-center w-full text-3xl font-bold", titleClassName)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("opacity-50 text-center w-full mb-2", subtitleClassName)}>
            {subtitle}
          </p>
        )}
        
        {/* Social Buttons */}
        {showSocialAuth && (
          <>
            <SocialButton
              icon={<FaGoogle size={20} />}
              label="Sign up with Google"
              href={googleAuthUrl}
              className={socialButtonClassName}
            />
            <SocialButton
              icon={<IoLogoGithub size={24} />}
              label="Sign up with GitHub"
              href={githubAuthUrl}
              className={socialButtonClassName}
            />
            <p className="opacity-50 text-center w-full">or</p>
          </>
        )}
        
        {/* Form */}
        <form method="post" onSubmit={handleSubmit} className={formClassName}>
          <section className="flex flex-col gap-2">
            {showNameFields && (
              <aside className="grid md:grid-cols-2 gap-2">
                <InputField
                  label="First name"
                  id="first-name"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  required={true}
                  className={inputClassName}
                />
                <InputField
                  label="Last name"
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  required={true}
                  className={inputClassName}
                />
              </aside>
            )}
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required={true}
              className={inputClassName}
            />
            <aside className="flex justify-between items-center">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Link
                href={forgotPasswordUrl}
                className="text-sm hover:underline transition opacity-50 duration-200 text-black dark:text-white hover:opacity-80"
              >
                Forgot your password?
              </Link>
            </aside>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className={cn(
                  "form-input",
                  errors.password ? "border-red-500 focus:ring-red-500" : "",
                  inputClassName
                )}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 w-full">{errors.password}</p>
              )}
            </div>
            <button className={cn("btn-1 mt-2 transition-opacity hover:opacity-80", buttonClassName)}>
              Sign up
            </button>
            <p className="text-center w-full mt-4">
              Already have an account?{" "}
              <Link
                href={loginUrl}
                className="underline transition duration-200 hover:opacity-80"
              >
                Log in
              </Link>
            </p>
          </section>
        </form>
      </aside>
    </section>
  );
};

export default SignUpBlock;