"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Pencil,
  Trash2,
  Plus,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/context/product-context";
import { useToast } from "@/hooks/use-toast";

type Section = "products" | "orders";

type ProductFormState = {
  name: string;
  price: string;
  image: string;
  category: string;
};

type StoredOrder = {
  id: string;
  date: string;
  total: number;
  status: string;
  items?: Array<{ quantity: number; product: { id: string; name: string; price: number } }>;
  user?: { name: string; email: string };
  deliveryAddress?: {
    fullName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
};

const initialFormState: ProductFormState = {
  name: "",
  price: "",
  image: "",
  category: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { products, addProduct, updateProduct, deleteProduct, getCategories } = useProducts();

  const [activeSection, setActiveSection] = useState<Section>("products");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormState>(initialFormState);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  const categories = getCategories();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.replace("/admin");
      return;
    }

    setIsCheckingAdmin(false);
  }, [router]);

  const loadOrders = () => {
    const parsedOrders = JSON.parse(localStorage.getItem("orders") || "[]") as StoredOrder[];
    setOrders(parsedOrders);
  };

  useEffect(() => {
    if (isCheckingAdmin) {
      return;
    }

    loadOrders();

    const onStorage = (event: StorageEvent) => {
      if (event.key === "orders") {
        loadOrders();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isCheckingAdmin]);

  const categoryOptions = useMemo(() => {
    const existing = categories.map((category) => category.slug);
    return ["electronics", "clothing", "home-kitchen", "beauty", "books", "accessories", ...existing]
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  }, [categories]);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingProductId(null);
  };

  const handleSubmitProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const image = formData.image.trim();
    const category = formData.category.trim();
    const price = Number(formData.price);

    if (!name || !image || !category || Number.isNaN(price) || price <= 0) {
      toast({
        title: "Invalid product data",
        description: "Please fill all fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    const payload = { name, price, image, category };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
      toast({ title: "Product updated", description: `${name} was updated successfully.` });
    } else {
      addProduct(payload);
      toast({ title: "Product added", description: `${name} was added successfully.` });
    }

    resetForm();
  };

  const handleEditProduct = (id: string) => {
    const product = products.find((item) => item.id === id);
    if (!product) {
      return;
    }

    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    });
    setActiveSection("products");
  };

  const handleDeleteProduct = (id: string, name: string) => {
    const confirmed = window.confirm(`Delete ${name}? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    deleteProduct(id);
    toast({ title: "Product deleted", description: `${name} has been removed.` });

    if (editingProductId === id) {
      resetForm();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  if (isCheckingAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage products and monitor orders</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/products">View Store</Link>
          </Button>
          <Button variant="destructive" className="gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeSection === "products" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveSection("products")}
              >
                <Package className="h-4 w-4" />
                Products
              </Button>
              <Button
                variant={activeSection === "orders" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveSection("orders")}
              >
                <ShoppingBag className="h-4 w-4" />
                Orders
              </Button>
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-6">
          {activeSection === "products" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5" />
                    {editingProductId ? "Edit Product" : "Add New Product"}
                  </CardTitle>
                  <CardDescription>
                    Create and update products. Changes are reflected instantly in the storefront.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Product name"
                        value={formData.name}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, name: event.target.value }))
                        }
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, price: event.target.value }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, image: event.target.value }))
                        }
                      />

                      <Select
                        value={formData.category || undefined}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.replace(/-/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {editingProductId ? "Update Product" : "Add Product"}
                      </Button>
                      {editingProductId && (
                        <Button type="button" variant="outline" onClick={resetForm}>
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Products ({products.length})</CardTitle>
                  <CardDescription>Manage existing product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium line-clamp-1">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${product.price.toFixed(2)} • {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>All Orders ({orders.length})</CardTitle>
                <CardDescription>View customer orders from local storage</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
                    No orders found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">Order #{order.id}</p>
                          <div className="flex items-center gap-2">
  <p className="text-sm text-muted-foreground capitalize">
    {order.status.replace("_", " ")}
  </p>

  <Select
    value={order.status}
    onValueChange={(value) => {
      const updatedOrders = orders.map((o) =>
        o.id === order.id ? { ...o, status: value } : o
      );

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);

      toast({
        title: "Order updated",
        description: `Order #${order.id} marked as ${value}`,
      });
    }}
  >
    <SelectTrigger className="w-[140px] h-8">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="pending">Pending</SelectItem>
      <SelectItem value="processing">Processing</SelectItem>
      <SelectItem value="shipped">Shipped</SelectItem>
      <SelectItem value="delivered">Delivered</SelectItem>
    </SelectContent>
  </Select>
</div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleString()} • ${order.total.toFixed(2)}
                        </p>

                        {order.user && (
                          <p className="mt-2 text-sm">
                            Customer: {order.user.name} ({order.user.email})
                          </p>
                        )}

                        {order.deliveryAddress && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Delivery: {order.deliveryAddress.fullName}, {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}
                          </p>
                        )}

                        <div className="mt-3 space-y-1 text-sm">
                          {(order.items || []).map((item) => (
                            <p key={item.product.id} className="text-muted-foreground">
                              {item.product.name} x {item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
