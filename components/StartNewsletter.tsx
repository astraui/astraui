"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner"; // Updated import
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Updated form schema with first name and last name
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function StartNewsletter() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with updated default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      // Show success message - directly call toast function
      toast.success("Successfully subscribed to the newsletter!");
      form.reset();
    } catch (error) {
      // Show error message
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while subscribing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full" id="newsletter">
      {/* Moved Toaster component to root level and ensured it's from sonner directly */}
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      disabled={isLoading}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      disabled={isLoading}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-4 lg:items-end space-y-4 lg:space-y-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="lg:col-span-3">
                  <FormLabel className="form-label">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@example.com"
                      {...field}
                      type="email"
                      disabled={isLoading}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="btn-1"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}