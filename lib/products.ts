export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  inStock: boolean;
  rating: number;
};

// Mock data for products
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation for an immersive audio experience.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt perfect for everyday wear.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "clothing",
    featured: false,
    inStock: true,
    rating: 4.3,
  },
  {
    id: "4",
    name: "Designer Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and a sleek design.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "accessories",
    featured: false,
    inStock: true,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Eco-friendly insulated water bottle that keeps your drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: true,
    inStock: true,
    rating: 4.7,
  },
  {
    id: "6",
    name: "Organic Face Moisturizer",
    description: "Hydrating face cream made with natural ingredients for all skin types.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "beauty",
    featured: false,
    inStock: true,
    rating: 4.4,
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description: "Fast wireless charger compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.2,
  },
  {
    id: "8",
    name: "Bestselling Novel",
    description: "Award-winning fiction novel that topped the charts this year.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "books",
    featured: false,
    inStock: true,
    rating: 4.9,
  },
  {
    id: "10",
    name: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support for long working hours.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: false,
    inStock: true,
    rating: 4.6,
  },
  {
    id: "11",
    name: "Luxury Scented Candle",
    description: "Hand-poured soy wax candle with premium essential oil fragrances.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: false,
    inStock: true,
    rating: 4.7,
  },
  {
    id: "15",
    name: "Handcrafted Ceramic Mug",
    description: "Artisan-made ceramic mug with unique glaze finish.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: false,
    inStock: true,
    rating: 4.6,
  },
  {
    id: "19",
    name: "Premium Coffee Beans",
    description: "Organic, fair-trade coffee beans from sustainable farms.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: false,
    inStock: true,
    rating: 4.9,
  },
  {
    id: "25",
    name: "Espresso Machine",
    description: "Professional-grade espresso machine for café-quality coffee at home.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1595246007497-68e1e9dc0d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: "29",
    name: "Linen Bedding Set",
    description: "Premium stonewashed linen bedding set including duvet cover and pillowcases.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    category: "home-kitchen",
    featured: false,
    inStock: true,
    rating: 4.9,
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getCategories = (): { name: string; slug: string; count: number }[] => {
  const categories = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categories).map(([slug, count]) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' & '),
    slug,
    count,
  }));
};