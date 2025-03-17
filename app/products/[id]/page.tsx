import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import ProductDetail from "@/components/product-detail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: "Product Not Found | NextCommerce",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} | NextCommerce`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductDetail product={product} />
      </Suspense>
    </div>
  );
}