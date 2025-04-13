"use client";

import React, { useState } from "react";
import { z } from "zod";
import Link from 'next/link'

// Import icons
import { FaGoogle } from "react-icons/fa"; // Google
import { IoLogoGithub } from "react-icons/io"; // GitHub

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
const InputField: React.FC<{
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required: boolean;
}> = ({ label, id, type, placeholder, value, onChange, error, required }) => (
  <div className="gap-2 flex flex-col">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className={`form-input ${error ? "border-red-500 focus:ring-red-500" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500 text-sm w-full mt-1">{error}</p>}
  </div>
);

// Reusable Social Button Component
const SocialButton: React.FC<{
  icon: React.ReactNode;
  label: string;
}> = ({ icon, label }) => (
  <button
    className="btn-2 flex items-center gap-2 w-full justify-center transition duration-200 hover:opacity-80"
    aria-label={label}
  >
    {icon}
    {label}
  </button>
);

const Blocks: React.FC = () => {
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
      
      // If we get here, form is valid
      console.log("Form submitted successfully:", formData);
      // Add your form submission logic here
      
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

  return (
      <section className="md:bordered md:grid md:place-items-center md:p-16 rounded-xl bg-muted-light dark:bg-muted-dark bg-[url('/logos/star-dark.png')] dark:bg-[url('/logos/star.png')] bg-contain bg-size-[256px] bg-center bg-no-repeat dark:bg-neutral-900 bg-neutral-100">
        <aside className="bordered flex flex-col gap-4 p-8 rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90">
          <h2 className="text-center w-full text-3xl font-bold">Sign up</h2>
          <p className="opacity-50 text-center w-full mb-2">
            Sign up with your Google or GitHub account.
          </p>
          {/* Social Buttons */}
          <Link href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://accounts.google.com/&ved=2ahUKEwjxj6SJ49OMAxWem4kEHSDvJ4oQFnoECAoQAQ&usg=AOvVaw33vbO0yD5ue-bN0tdaehNC">
            <SocialButton
              icon={<FaGoogle size={20} />}
              label="Sign up with Google"
            />
          </Link>
          <Link href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://github.com/topics/login&ved=2ahUKEwjy9suF49OMAxU2lokEHYNXMpsQjBB6BAgLEAE&usg=AOvVaw1UR4_QNFuSUPdkJbTdz8fq">
            <SocialButton
              icon={<IoLogoGithub size={24} />}
              label="Sign up with GitHub"
            />
          </Link>
          <p className="opacity-50 text-center w-full">or</p>
          {/* Form */}
          <form method="post" onSubmit={handleSubmit}>
            <section className="flex flex-col gap-2">
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
                />
              </aside>
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required={true}
              />
              <aside className="flex justify-between items-center">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link
                  href="/#contact"
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
                  className={`form-input ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 w-full">{errors.password}</p>
                )}
              </div>
              <button className="btn-1 mt-2 transition-opacity hover:opacity-80">
                Sign up
              </button>
              <p className="text-center w-full mt-4">
                Already have an account?{" "}
                <Link
                  href="/#contact"
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

export default Blocks;