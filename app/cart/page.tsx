"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ChevronLeft, 
  ShoppingBag, 
  CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to view your cart.",
        variant: "destructive",
      });
      router.push("/account");
    }
  }, [isAuthenticated, router, toast]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Create order object
      const order = {
        id: `ord_${Date.now()}`,
        date: new Date().toISOString(),
        items: cartItems,
        total: subtotal,
        status: "pending",
      };

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });

      // Clear cart and redirect
      clearCart();
      router.push("/orders");
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/products">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/products" className="mt-6">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex flex-col gap-4 sm:flex-row">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium line-clamp-2">{item.product.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="ml-2 hidden sm:inline">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{subtotal >= 50 ? "Free" : "$4.99"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(subtotal * 0.07).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ${(
                      subtotal +
                      (subtotal >= 50 ? 0 : 4.99) +
                      subtotal * 0.07
                    ).toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full gap-2"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  <CreditCard className="h-4 w-4" />
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}