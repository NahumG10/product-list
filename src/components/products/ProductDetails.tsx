"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/models/Product";

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center py-10">Loading product details...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  return (
    <div>
      <Link
        href="/products"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="relative h-96">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Category:</span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
