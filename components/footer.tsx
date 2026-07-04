import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, MessageCircle, Globe, Mail, Phone, PinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ABOUT */}
          <div>
            <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              About Developer
            </h3>

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

          {/* LINKS */}
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

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Connect With Us
            </h3>

            <div className="space-y-3">
              <Link href="https://www.linkedin.com/in/sachin-kumar-08b390359?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <span>LinkedIn</span>
              </Link>

              <Link href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <span>WhatsApp: sach_in.dev18</span>
              </Link>

              <Link href="https://sa-chin.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Globe className="h-5 w-5" />
                </Button>
                <span>Portfolio</span>
              </Link>

              <Link href="https://github.com/Sach-in-SE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Github className="h-5 w-5" />
                </Button>
                <span>GitHub</span>
              </Link>

              <Link href="https://www.instagram.com/official__luc_ky/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5" />
                </Button>
                <span>Instagram</span>
              </Link>
            </div>

            {/* EXTRA TEXT */}
            <p className="text-sm text-muted-foreground mt-4">
              Feel free to connect for collaboration 🚀
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-muted pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopKart. All rights reserved.</p>

          <p className="mt-2">
            Developed with ❤️ by{" "}
            <Link 
              href="https://github.com/Sach-in-SE" 
              target="_blank"
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
