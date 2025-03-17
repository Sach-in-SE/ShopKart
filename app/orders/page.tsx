"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Package, ChevronLeft, Truck, CheckCircle2, Clock } from "lucide-react";
import { CartItem } from "@/context/cart-context";

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "pending" | "in_transit" | "delivered";
}

const statusIcons = {
  pending: Clock,
  in_transit: Truck,
  delivered: CheckCircle2
};

const statusColors = {
  pending: "text-yellow-500",
  in_transit: "text-blue-500",
  delivered: "text-green-500"
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account");
      return;
    }

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/profile">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <Card className="backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-medium">No orders yet</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              You haven't placed any orders yet. Browse our products and make your first purchase!
            </p>
            <Button asChild className="mt-6">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            const statusColor = statusColors[order.status];

            return (
              <motion.div key={order.id} variants={item}>
                <Card className="overflow-hidden backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription>
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </CardDescription>
                      </div>
                      <div className={`flex items-center gap-2 ${statusColor}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="font-medium capitalize">
                          {order.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}