"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useProducts } from "@/context/product-context";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const { getCategories, getProductsByCategory } = useProducts();

  const categories = getCategories();
  const category = categories.find((item) => item.slug === slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="mt-2 text-muted-foreground">
            The category you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/products">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">No products in this category</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for new arrivals.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
