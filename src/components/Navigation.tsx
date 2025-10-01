import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex items-center justify-between h-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Logo size="xl" className="text-foreground" />
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a 
              href="#product" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a 
              href="#technology" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Technology
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <Button 
              variant="default" 
              className="bg-gradient-primary hover:opacity-90"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Button>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="ghost" size="sm">
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className="block w-4 h-0.5 bg-foreground mb-1"></span>
                <span className="block w-4 h-0.5 bg-foreground mb-1"></span>
                <span className="block w-4 h-0.5 bg-foreground"></span>
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
};