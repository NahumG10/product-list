import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Product Catalog</h1>
        <p className="mb-8 text-xl">
          Browse our collection of products and share your reviews
        </p>
        <Link
          href="/products"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Products
        </Link>
      </div>
    </main>
  );
}
