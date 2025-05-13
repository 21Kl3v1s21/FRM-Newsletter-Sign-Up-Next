// app/unsubscribe/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  if (!searchParams.token && !searchParams.email) {
    redirect("/newsletter?error=missing_parameters");
  }

  const handleUnsubscribe = async () => {
    "use server";
    
    try {
      if (searchParams.token) {
        await prisma.subscriber.delete({
          where: { token: searchParams.token },
        });
      } else if (searchParams.email) {
        await prisma.subscriber.delete({
          where: { email: searchParams.email },
        });
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Unsubscribe from Newsletter
          </h1>
          <p className="mt-4 text-gray-600">
            Are you sure you want to unsubscribe from our newsletter?
          </p>
        </div>
        <form action={handleUnsubscribe}>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Unsubscribe
          </button>
        </form>
      </div>
    </div>
  );
}