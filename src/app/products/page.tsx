import ProductList from "@/components/products/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Product Catalog",
  description: "Browse our collection of products",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductList />
    </div>
  );
}
