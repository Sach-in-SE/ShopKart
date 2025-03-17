import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategories } from "@/lib/products";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = getCategories();
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    return {
      title: "Category Not Found | Shopkart",
      description: "The requested category could not be found.",
    };
  }
  
  return {
    title: `${category.name} | Shopkart`,
    description: `Browse our collection of ${category.name.toLowerCase()} products.`,
  };
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getCategories();
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(params.slug);
  
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

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}