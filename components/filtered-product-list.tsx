"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/lib/products";
import { useProducts } from "@/context/product-context";

interface FilteredProductListProps {
  products?: Product[];
}

const FilteredProductList = ({ products }: FilteredProductListProps) => {
  const { products: contextProducts, getCategories } = useProducts();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sourceProducts = products ?? contextProducts;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isHydratedFromUrl, setIsHydratedFromUrl] = useState(false);

  const categories = getCategories();
  const availableCategorySlugs = useMemo(
    () => new Set(categories.map((category) => category.slug)),
    [categories]
  );

  useEffect(() => {
    const queryParam = searchParams.get("q") ?? "";
    const categoryParam = searchParams.get("category") ?? "all";
    const minParam = searchParams.get("min") ?? "";
    const maxParam = searchParams.get("max") ?? "";

    const normalizedCategory =
      categoryParam === "all" || availableCategorySlugs.has(categoryParam)
        ? categoryParam
        : "all";

    setSearchQuery(queryParam);
    setSelectedCategory(normalizedCategory);
    setMinPrice(minParam);
    setMaxPrice(maxParam);
    setIsHydratedFromUrl(true);
  }, [searchParams, availableCategorySlugs]);

  useEffect(() => {
    if (!isHydratedFromUrl) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (minPrice.trim()) {
      params.set("min", minPrice.trim());
    } else {
      params.delete("min");
    }

    if (maxPrice.trim()) {
      params.set("max", maxPrice.trim());
    } else {
      params.delete("max");
    }

    const nextQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (nextQueryString !== currentQueryString) {
      router.replace(
        nextQueryString ? `${pathname}?${nextQueryString}` : pathname,
        { scroll: false }
      );
    }
  }, [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    pathname,
    router,
    searchParams,
    isHydratedFromUrl,
  ]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const parsedMin = minPrice ? Number(minPrice) : null;
    const parsedMax = maxPrice ? Number(maxPrice) : null;

    return sourceProducts.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesMinPrice = parsedMin === null || product.price >= parsedMin;
      const matchesMaxPrice = parsedMax === null || product.price <= parsedMax;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [sourceProducts, searchQuery, selectedCategory, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedCategory !== "all" ||
    minPrice.length > 0 ||
    maxPrice.length > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products by name..."
              aria-label="Search products by name"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
            />
            <Input
              type="number"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {sourceProducts.length} products
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try updating your search or filters to find what you need.
          </p>
          {hasActiveFilters && (
            <Button variant="ghost" className="mt-4" onClick={clearFilters}>
              Reset and show all products
            </Button>
          )}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default FilteredProductList;
