/**
 * Portable navbar module — reuse in this site or copy into another project.
 *
 * Usage:
 *   import { NavigationBar, defaultNavItems, type NavItem } from "@/components/navbar";
 *   <NavigationBar containerRef={scrollRef} />
 *
 * See README.md in this folder for reuse in another website.
 */

export { NavigationBar } from "./NavigationBar";
export type { NavigationBarProps } from "./NavigationBar";
export { NavbarLogo } from "./NavbarLogo";
export type { NavbarLogoProps } from "./NavbarLogo";
export { defaultNavItems } from "./navbar-config";
export type { NavItem } from "./navbar-config";
