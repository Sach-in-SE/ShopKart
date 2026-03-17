"use client";

import ProductDetail from "@/components/product-detail";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useProducts } from "@/context/product-context";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { getProductById } = useProducts();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-muted-foreground">
            This product may have been removed or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
