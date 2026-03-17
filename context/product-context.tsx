"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Product, products as seedProducts } from "@/lib/products";

const STORAGE_KEY = "shopkart_products";

type ProductInput = {
  name: string;
  price: number;
  image: string;
  category: string;
};

type ProductContextType = {
  products: Product[];
  addProduct: (input: ProductInput) => void;
  updateProduct: (id: string, input: ProductInput) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getCategories: () => { name: string; slug: string; count: number }[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const normalizeCategory = (category: string) =>
  category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const formatCategoryName = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const readStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return seedProducts;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return seedProducts;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialProducts = readStoredProducts();
    setProducts(initialProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, isInitialized]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setProducts(readStoredProducts());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addProduct = useCallback((input: ProductInput) => {
    const now = Date.now();
    const safeCategory = normalizeCategory(input.category) || "uncategorized";

    const newProduct: Product = {
      id: `p_${now}`,
      name: input.name.trim(),
      description: `${input.name.trim()} - newly added product.`,
      price: Number(input.price),
      image: input.image.trim(),
      category: safeCategory,
      inStock: true,
      featured: false,
      rating: 4.5,
    };

    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, input: ProductInput) => {
    const safeCategory = normalizeCategory(input.category) || "uncategorized";

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              name: input.name.trim(),
              description: `${input.name.trim()} - updated product information.`,
              price: Number(input.price),
              image: input.image.trim(),
              category: safeCategory,
            }
          : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find((product) => product.id === id);
  }, [products]);

  const getProductsByCategory = useCallback((category: string) => {
    return products.filter((product) => product.category === category);
  }, [products]);

  const categories = useMemo(() => {
    const categoryMap = products.reduce((acc, product) => {
      const slug = product.category;
      if (!acc[slug]) {
        acc[slug] = 0;
      }
      acc[slug] += 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryMap)
      .map(([slug, count]) => ({
        slug,
        count,
        name: formatCategoryName(slug),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const value: ProductContextType = useMemo(() => ({
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getCategories: () => categories,
  }), [
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    categories,
  ]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
