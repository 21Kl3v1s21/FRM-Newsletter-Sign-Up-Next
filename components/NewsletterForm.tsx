// components/NewsletterForm.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address"),
  preferences: z.object({
    weeklyUpdates: z.boolean(),
    productNews: z.boolean(),
    events: z.boolean(),
  }),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferences: {
        weeklyUpdates: true,
        productNews: true,
        events: false,
      },
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h3 className="text-lg font-medium text-green-800">
          Thank you for subscribing!
        </h3>
        <p className="mt-2 text-green-700">
          We've sent a confirmation email to your inbox. Please check your email
          to complete the subscription.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name (optional)
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700">Email preferences</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="weeklyUpdates"
              type="checkbox"
              {...register("preferences.weeklyUpdates")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="weeklyUpdates" className="ml-2 block text-sm text-gray-700">
              Weekly updates
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="productNews"
              type="checkbox"
              {...register("preferences.productNews")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="productNews" className="ml-2 block text-sm text-gray-700">
              Product news
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="events"
              type="checkbox"
              {...register("preferences.events")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="events" className="ml-2 block text-sm text-gray-700">
              Events and webinars
            </label>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe to newsletter"}
        </button>
      </div>
    </form>
  );
}