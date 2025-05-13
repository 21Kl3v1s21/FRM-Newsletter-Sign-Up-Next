// app/confirm/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  if (!searchParams.token) {
    redirect("/newsletter?error=missing_token");
  }

  const subscriber = await prisma.subscriber.update({
    where: { token: searchParams.token },
    data: { confirmed: true, token: null },
  });

  if (!subscriber) {
    redirect("/newsletter?error=invalid_token");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Confirmed!
          </h1>
          <p className="mt-4 text-gray-600">
            Thank you for confirming your subscription to our newsletter.
          </p>
          <p className="mt-2 text-gray-600">
            You'll now receive updates based on your selected preferences.
          </p>
        </div>
        <div className="mt-6">
          <a
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}