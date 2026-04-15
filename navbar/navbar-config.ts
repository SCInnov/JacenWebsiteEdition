/**
 * Navbar configuration — customize for your project or pass as props to NavigationBar.
 */

export interface NavItem {
  id: string;
  label: string;
}

export const defaultNavItems: NavItem[] = [
  { id: "product", label: "Features" },
  { id: "technology", label: "Technology" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
