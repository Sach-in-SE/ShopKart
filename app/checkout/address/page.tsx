"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, { message: "Enter a valid phone number" }),
  addressLine: z.string().min(5, { message: "Address line is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z
    .string()
    .regex(/^[0-9]{5,6}$/, { message: "Enter a valid pincode" }),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: user?.name || "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account");
      return;
    }

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [isAuthenticated, cartItems, router]);

  const onSubmit = async (values: AddressFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login before placing an order.",
        variant: "destructive",
      });
      router.push("/account");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const shipping = subtotal >= 50 ? 0 : 4.99;
      const tax = subtotal * 0.07;
      const total = Number((subtotal + shipping + tax).toFixed(2));

      const order = {
        id: `ord_${Date.now()}`,
        date: new Date().toISOString(),
        items: cartItems,
        total,
        user,
        deliveryAddress: values,
        status: "placed" as const,
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("deliveryAddress", JSON.stringify(values));
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));

      clearCart();
      router.push("/orders/success");
    } catch (error) {
      toast({
        title: "Order failed",
        description: "Unable to place your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isAuthenticated || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Delivery Address</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Details
              </CardTitle>
              <CardDescription>
                Enter your delivery address to continue checkout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line</FormLabel>
                        <FormControl>
                          <Input placeholder="House no, street, area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Bareilly" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Uttar Pradesh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="243001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full sm:w-auto" disabled={isPlacingOrder}>
                    {isPlacingOrder ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
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
              <div className="flex justify-between border-t pt-3 font-medium text-base">
                <span>Total</span>
                <span>${(subtotal + (subtotal >= 50 ? 0 : 4.99) + subtotal * 0.07).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Your order will be delivered to the address you submit.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
