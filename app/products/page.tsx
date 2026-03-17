import { Suspense } from "react";
import Link from "next/link";
import FilteredProductList from "@/components/filtered-product-list";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "All Products | NextCommerce",
  description: "Browse our complete collection of products",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Browse our complete collection</p>
        </div>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <FilteredProductList />
      </Suspense>
    </div>
  );
}