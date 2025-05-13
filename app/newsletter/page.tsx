// app/newsletter/page.tsx
import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Join Our Newsletter</h1>
          <p className="mt-2 text-sm text-gray-600">
            Get the latest updates and news delivered to your inbox.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}