"use client";
import ProductDetails from "@/components/products/ProductDetails";
import ReviewSection from "@/components/reviews/ReviewSection";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="container mx-auto py-8 px-4">
      <ProductDetails id={id as string} />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ReviewSection productId={id as string} />
      </div>
    </div>
  );
}
