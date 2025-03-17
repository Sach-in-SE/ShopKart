"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { name: "Electronics", href: "/category/electronics" },
    { name: "Clothing", href: "/category/clothing" },
    { name: "Home & Kitchen", href: "/category/home-kitchen" },
    { name: "Beauty", href: "/category/beauty" },
    { name: "Books", href: "/category/books" },
    { name: "Accessories", href: "/category/accessories" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
      isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background/80'
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">ShopKart</span>
          </Link>
          <nav className="hidden gap-4 md:flex lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex md:w-1/3 lg:w-1/4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-md pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>My Account</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/orders')}>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          )}
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px]">
              <div className="px-2 py-6">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="font-bold">ShopKart</span>
                </Link>
                
                <form onSubmit={handleSearch} className="relative mb-6 w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-md pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                
                <nav className="flex flex-col space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-6 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 py-2">
                        <User className="h-5 w-5" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.name}</span>
                          <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                      </div>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          Profile
                        </Button>
                      </Link>
                      <Link href="/orders">
                        <Button variant="outline" className="w-full justify-start">
                          Orders
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-destructive"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/account">
                      <Button className="w-full">Login / Register</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;