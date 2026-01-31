import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface NavbarLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  /** Logo when scrolled (e.g. icon). Default: "Second Chance Icon.svg" */
  logoSrcIcon?: string;
  /** Logo when at top (e.g. wide). Default: "Second Chance Logo Wide.svg" */
  logoSrcWide?: string;
  alt?: string;
  /** Scroll container selector for "scroll to switch" behavior. Use "" to disable. */
  scrollContainerSelector?: string;
}

const sizeClasses: Record<NonNullable<NavbarLogoProps["size"]>, string> = {
  sm: "h-8 w-auto",
  md: "h-12 w-auto",
  lg: "h-16 w-auto",
  xl: "h-20 w-auto",
  xxl: "h-24 w-auto",
};

export function NavbarLogo({
  className = "",
  size = "md",
  logoSrcIcon = "Second Chance Icon.svg",
  logoSrcWide = "Second Chance Logo Wide.svg",
  alt = "Logo",
  scrollContainerSelector = ".fixed-scroll-container",
}: NavbarLogoProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!scrollContainerSelector) {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      const el = document.querySelector(scrollContainerSelector) as HTMLElement | null;
      if (el) {
        setScrollY(el.scrollTop);
      } else {
        setScrollY(window.scrollY);
      }
    };

    const el = document.querySelector(scrollContainerSelector) as HTMLElement | null;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollContainerSelector]);

  const useIcon = scrollY > 50;
  const base = typeof import.meta !== "undefined" && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : "/";
  const src = `${base}${useIcon ? logoSrcIcon : logoSrcWide}`;

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} object-contain`}
        key={useIcon ? "icon" : "logo"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
