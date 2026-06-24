export interface NavMenuState {
  /** Whether the mobile nav drawer is open. */
  readonly isMenuOpen: boolean;
  /** Whether the header has scrolled into its sticky/condensed state. */
  readonly isSticky: boolean;
  /** Name of the currently expanded dropdown, or null when none is open. */
  readonly openDropdown: string | null;
  /** Toggle the mobile nav drawer open/closed. */
  readonly toggleMenu: () => void;
  /** Force the mobile nav drawer closed (e.g. after navigation). */
  readonly closeMenu: () => void;
  /** Toggle a named dropdown open/closed. */
  readonly toggleDropdown: (dropdownName: string) => void;
}
