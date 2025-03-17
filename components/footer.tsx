"use client";

import Link from "next/link";
import { 
  Github, 
  Instagram, 
  Mail, 
  MessageSquare, 
  Phone, 
  PinIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t bg-gradient-to-b from-background/50 to-background backdrop-blur-xl">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Developer
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Developed by Sachin Kumar
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:lucky002954@gmail.com" className="hover:text-primary">
                  lucky002954@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9759938908</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <PinIcon className="h-4 w-4" />
                <span>Bareilly, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.instagram.com/official__luc_ky/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link href="#contact" className="group">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Contact</span>
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <Card className="backdrop-blur-xl bg-background/30 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Let's create something amazing together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    className="bg-background/50 border-muted"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-background/50 border-muted"
                    required
                  />
                  <Textarea
                    placeholder="Your message"
                    className="bg-background/50 border-muted"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 border-t border-muted pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
          <p className="mt-2">
            Developed with ❤️ by{" "}
            <Link 
              href="https://github.com/Sach-in-SE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-primary"
            >
              Sachin Kumar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;