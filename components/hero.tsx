"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    title: "Summer Collection 2025",
    description: "Discover the latest trends and styles for the summer season.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    cta: "Shop Now",
    link: "/category/clothing",
  },
  {
    title: "Tech Essentials",
    description: "Upgrade your gadgets with our premium electronics collection.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    cta: "Explore",
    link: "/category/electronics",
  },
  {
    title: "Home Makeover",
    description: "Transform your living space with our curated home collection.",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    cta: "Discover",
    link: "/category/home-kitchen",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <div 
      className="relative mb-16 overflow-hidden rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="h-[300px] sm:h-[400px] md:h-[500px] w-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
          <div className="container flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="mb-2 sm:mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {slide.title}
              </h1>
              <p className="mb-4 sm:mb-8 text-base sm:text-lg text-gray-200">{slide.description}</p>
              <Link href={slide.link}>
                <Button size="lg" className="group">
                  {slide.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;