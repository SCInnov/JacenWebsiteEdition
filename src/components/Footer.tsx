import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer 
      className="h-screen flex items-center justify-center relative bg-background transition-all duration-1000 ease-in-out"
    >
      {/* Light Blue Gradient at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-1 relative z-10">
              <Logo size="xxl" className="text-primary mb-1" />
            </div>
            <p className="text-primary mb-4 leading-relaxed relative z-10">
              Reimagining stroke care through innovative assistive technology 
              that helps people regain their independence.
            </p>
            <div className="flex items-center space-x-2 text-primary relative z-10">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Restoring Independence</span>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-primary relative z-10">Quick Links</h4>
            <div className="space-y-2 relative z-10">
              <a href="#features" className="block text-primary hover:text-primary/80 transition-colors">
                Features
              </a>
              <a href="#technology" className="block text-primary hover:text-primary/80 transition-colors">
                Technology
              </a>
              <a href="#about" className="block text-primary hover:text-primary/80 transition-colors">
                About Us
              </a>
              <a href="#contact" className="block text-primary hover:text-primary/80 transition-colors">
                Contact
              </a>
            </div>
          </motion.div>
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-primary relative z-10">Company</h4>
            <div className="space-y-2 relative z-10">
              <p className="text-primary text-sm">
                Second Chance Innovations
              </p>
              <p className="text-primary text-sm">
                Transforming stroke rehabilitation
              </p>
              <p className="text-primary text-sm">
                through innovative technology
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-primary/20 mt-8 pt-8 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-primary">
            © 2025 Second Chance Innovations. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};