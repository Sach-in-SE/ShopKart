"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getFeaturedProducts, Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to add items to your cart.",
        variant: "destructive",
      });
      router.push("/account");
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">
              Check out our most popular items handpicked for you.
            </p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="group">
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <Card key={product.id} className="overflow-hidden h-full flex flex-col">
              <Link href={`/products/${product.id}`} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4 flex-grow">
                <div className="space-y-1">
                  <Link href={`/category/${product.category}`}>
                    <span className="text-xs font-medium uppercase text-muted-foreground hover:underline">
                      {product.category.replace('-', ' & ')}
                    </span>
                  </Link>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold line-clamp-2 hover:underline">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
                <div className="font-semibold">${product.price.toFixed(2)}</div>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="whitespace-nowrap"
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;