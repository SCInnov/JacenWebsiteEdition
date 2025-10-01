import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto", 
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
    xxl: "h-24 w-auto"
  };

  return (
    <motion.div 
      className={`${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={`${import.meta.env.BASE_URL}Second Chance Logo Wide.svg`}
        alt="Second Chance Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
    </motion.div>
  );
};
