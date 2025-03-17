import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4 py-16 text-center">
      <ShoppingBag className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}