"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Github, Instagram, Mail, Phone, PinIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          About ShopKart
        </h1>

        <div className="space-y-8">
          <Card className="backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                ShopKart is a modern e-commerce platform designed to provide users with a seamless shopping experience.
                Our mission is to connect customers with high-quality products while offering exceptional service and
                competitive prices.
              </p>
              <p className="text-muted-foreground">
                Founded with a vision to revolutionize online shopping, we continuously strive to improve and innovate,
                ensuring that our platform remains at the forefront of e-commerce technology.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Developer Profile</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">SK</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Sachin Kumar</h3>
                  <p className="text-muted-foreground mb-4">
                    Full Stack Developer specializing in modern web technologies and e-commerce solutions.
                    Passionate about creating seamless user experiences and scalable applications.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:lucky002954@gmail.com" className="hover:text-primary">
                        lucky002954@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>+91 9759938908</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <PinIcon className="h-4 w-4" />
                      <span>Bareilly, Uttar Pradesh</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                          <Instagram className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Next.js 13",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Shadcn UI",
                  "Framer Motion",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="p-4 rounded-lg bg-background/50 text-center hover:bg-background/70 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}