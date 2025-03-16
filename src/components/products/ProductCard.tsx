"use client";

import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/models/Product";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        {product.imageUrl && (
          <Image
            src={new URL(product.imageUrl).toString()}
            alt={product.name}
            style={{ objectFit: "cover" }}
            className="w-full h-full"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Link
            href={`/products/${product._id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
