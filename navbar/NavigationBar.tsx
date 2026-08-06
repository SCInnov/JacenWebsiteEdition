import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { NavItem } from "./navbar-config";
import { defaultNavItems } from "./navbar-config";
import { NavbarLogo } from "./NavbarLogo";

export interface NavigationBarProps {
  /** Ref to scroll container (e.g. main with overflow). Omit for window scroll. */
  containerRef?: React.RefObject<HTMLDivElement | null>;
  /** Nav links. Defaults to Features, Technology, About, Contact. */
  items?: NavItem[];
  /** Custom logo (react node). If not set, uses NavbarLogo with Second Chance assets. */
  logo?: React.ReactNode;
  /** Scroll container selector for logo scroll-to-icon behavior. Default: ".fixed-scroll-container" */
  scrollContainerSelector?: string;
  /** Extra class for outer nav wrapper. */
  className?: string;
}

export function NavigationBar({
  containerRef,
  items = defaultNavItems,
  logo,
  scrollContainerSelector = ".fixed-scroll-container",
  className,
}: NavigationBarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastActiveId, setLastActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let teardown: (() => void) | null = null;

    const initTimeout = setTimeout(() => {
      const handleScroll = () => {
        try {
          const container = containerRef?.current ?? null;
          let currentId: string | null = null;

          if (container) {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;

            items.forEach((item) => {
              try {
                const el = document.getElementById(item.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const offsetTop = rect.top - containerTop;
                  if (offsetTop <= 80 && offsetTop + rect.height >= 80) {
                    currentId = item.id;
                  }
                }
              } catch {
                // ignore
              }
            });
          } else {
            items.forEach((item) => {
              try {
                const el = document.getElementById(item.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  if (rect.top <= 80 && rect.bottom >= 80) {
                    currentId = item.id;
                  }
                }
              } catch {
                // ignore
              }
            });
          }

          if (currentId) setLastActiveId(currentId);
          setActiveId(currentId);
        } catch {
          // ignore
        }
      };

      const container = containerRef?.current ?? null;
      if (container) {
        container.addEventListener("scroll", handleScroll, { passive: true });
        setTimeout(() => handleScroll(), 100);
        teardown = () => container.removeEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
        setTimeout(() => handleScroll(), 100);
        teardown = () => window.removeEventListener("scroll", handleScroll);
      }
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      teardown?.();
    };
  }, [containerRef, items]);

  useEffect(() => {
    try {
      const idToUse = activeId || lastActiveId;
      if (!navRef?.current || !idToUse) return;

      const links = Array.from(navRef.current.querySelectorAll<HTMLAnchorElement>("a"));
      const activeLink = links.find((link) => link.getAttribute("href") === `#${idToUse}`);

      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setHighlightStyle({
          left: rect.left - navRect.left,
          top: rect.top - navRect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    } catch {
      // ignore
    }
  }, [activeId, lastActiveId]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const defaultLogo = (
    <NavbarLogo
      size="xl"
      className="text-foreground"
      scrollContainerSelector={scrollContainerSelector}
    />
  );

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 pointer-events-none ${className ?? ""}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -8, backgroundColor: "rgba(255, 240, 220, 0.35)" }}
          animate={{ opacity: 1, y: 0, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="
            pointer-events-auto
            flex items-center justify-between h-16
            backdrop-blur-xl
            border border-white/20
            shadow-lg
            rounded-xl
            px-6
            relative
          "
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {logo ?? defaultLogo}
          </motion.div>

          <motion.div
            ref={navRef}
            className="hidden md:flex items-center space-x-6 relative"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {lastActiveId && highlightStyle.width > 0 && highlightStyle.height > 0 && (
              <motion.div
                className="absolute rounded-xl pointer-events-none"
                style={{
                  left: highlightStyle.left - 6,
                  top: highlightStyle.top - 4,
                  width: highlightStyle.width + 12,
                  height: highlightStyle.height + 8,
                }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className="w-full h-full
                    bg-white/5
                    backdrop-blur-md
                    border border-white/30
                    rounded-xl
                    shadow-[inset_0_2px_6px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(255,255,255,0.1)]"
                />
              </motion.div>
            )}

            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted-foreground hover:text-primary transition-colors relative z-10 px-3 py-1"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            className="md:hidden flex items-center space-x-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Button variant="ghost" size="sm" type="button" aria-label="Open menu">
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className="block w-4 h-0.5 bg-foreground mb-1" />
                <span className="block w-4 h-0.5 bg-foreground mb-1" />
                <span className="block w-4 h-0.5 bg-foreground" />
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
