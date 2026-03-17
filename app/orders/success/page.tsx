"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Card className="text-center backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardHeader className="space-y-4">
            <div className="mx-auto rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl">Order Placed Successfully</CardTitle>
            <CardDescription className="text-base">
              Thank you for shopping with ShopKart. Your order has been placed and is now being processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="gap-2">
              <Link href="/orders">
                <ShoppingBag className="h-4 w-4" />
                View My Orders
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
