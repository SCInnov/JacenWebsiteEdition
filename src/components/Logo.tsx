import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the scrollable container (fixed-scroll-container)
      const scrollContainer = document.querySelector('.fixed-scroll-container') as HTMLElement;
      
      if (scrollContainer) {
        const currentScrollY = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.scrollHeight;
        const containerClientHeight = scrollContainer.clientHeight;
        const maxScroll = containerHeight - containerClientHeight;
        
        console.log('Logo Scroll Y (container):', currentScrollY);
        console.log('Container height:', containerHeight, 'Client height:', containerClientHeight, 'Max scroll:', maxScroll);
        setScrollY(currentScrollY);
      } else {
        // Fallback to window scroll if container not found
        const currentScrollY = window.scrollY;
        console.log('Logo Scroll Y (window fallback):', currentScrollY);
        setScrollY(currentScrollY);
      }
    };
    
    // Listen to scroll events on the scrollable container
    const scrollContainer = document.querySelector('.fixed-scroll-container') as HTMLElement;
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Fallback to window scroll
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto", 
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
    xxl: "h-24 w-auto"
  };

  // Switch to icon after 50px scroll
  const useIcon = scrollY > 50;
  console.log('Logo useIcon:', useIcon, 'scrollY:', scrollY); // Debug log

  return (
    <motion.div 
      className={`${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}${useIcon ? 'Second Chance Icon.svg' : 'Second Chance Logo Wide.svg'}`}
        alt="Second Chance Logo" 
        className={`${sizeClasses[size]} object-contain`}
        key={useIcon ? 'icon' : 'logo'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
