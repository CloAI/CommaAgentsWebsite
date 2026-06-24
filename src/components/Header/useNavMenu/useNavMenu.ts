import * as React from "react";
import type { NavMenuState } from "./useNavMenu.types";

/**
 * Manage header navigation UI state: the mobile drawer, dropdown expansion,
 * and the scroll-driven sticky flag.
 *
 * @example
 * ```tsx
 * const { isMenuOpen, toggleMenu } = useNavMenu();
 * ```
 */
export function useNavMenu(): NavMenuState {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const toggleMenu = React.useCallback((): void => {
    setIsMenuOpen((previousOpen) => !previousOpen);
  }, []);

  const closeMenu = React.useCallback((): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = React.useCallback((dropdownName: string): void => {
    setOpenDropdown((currentOpen) =>
      currentOpen === dropdownName ? null : dropdownName,
    );
  }, []);

  React.useEffect(() => {
    function handleScroll(): void {
      setIsSticky(window.scrollY > 0);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isMenuOpen,
    isSticky,
    openDropdown,
    toggleMenu,
    closeMenu,
    toggleDropdown,
  };
}
