"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { IProduct } from "@/models/Product";

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading products...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: IProduct) => (
        <ProductCard key={product._id.toString()} product={product} />
      ))}
    </div>
  );
}
