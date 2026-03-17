"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Minus, 
  Plus, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/context/product-context";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const relatedProducts = products
    .filter((p) => p.featured && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to add items to your cart.",
        variant: "destructive",
      });
      router.push("/account");
      return;
    }
    
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/products">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <Link href={`/category/${product.category}`}>
              <span className="text-sm font-medium uppercase text-muted-foreground hover:underline">
                {product.category.replace('-', ' & ')}
              </span>
            </Link>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Quantity</div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>In stock and ready to ship</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day easy returns</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full flex overflow-x-auto sm:w-auto">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4 space-y-4">
          <p>{product.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            nisi vel libero feugiat, vel efficitur nunc faucibus. Nulla facilisi.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Donec vel sapien eget nisi tincidunt
            consequat.
          </p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm font-medium">Brand</div>
                <div className="text-sm text-muted-foreground">ShopKart</div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm font-medium">Model</div>
                <div className="text-sm text-muted-foreground">NC-{product.id}</div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm font-medium">Material</div>
                <div className="text-sm text-muted-foreground">Premium Quality</div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm font-medium">Warranty</div>
                <div className="text-sm text-muted-foreground">1 Year</div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-4xl font-bold">{product.rating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Based on 24 reviews
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted">
                      <div className="flex h-full w-full items-center justify-center font-medium">
                        JD
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">
                        2 months ago
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 5 ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <p>
                      Excellent product! Exactly as described and arrived quickly.
                      Would definitely recommend to others.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted">
                      <div className="flex h-full w-full items-center justify-center font-medium">
                        AS
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Alice Smith</div>
                      <div className="text-sm text-muted-foreground">
                        1 month ago
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <p>
                      Very happy with my purchase. The quality is great and it
                      looks even better in person than in the photos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">You Might Also Like</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden h-full flex flex-col">
              <Link href={`/products/${relatedProduct.id}`} className="overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
              <CardContent className="p-4 flex-grow">
                <Link href={`/products/${relatedProduct.id}`}>
                  <h3 className="font-semibold line-clamp-2 hover:underline">
                    {relatedProduct.name}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-semibold">
                    ${relatedProduct.price.toFixed(2)}
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(relatedProduct.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;