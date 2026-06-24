import * as React from "react";
import { ChevronDown, Menu, X } from "react-feather";
import config from "@config/config.json";
import styles from "./Header.module.scss";
import type { NavigationLink } from "./Header.types";
import { hasActiveChild, isLinkActive } from "./Header.utils";
import { useNavMenu } from "./useNavMenu";

export interface HeaderProps {
  /** Top-level navigation links, optionally with dropdown children. */
  readonly navigation: ReadonlyArray<NavigationLink>;
  /** The current page path, used to highlight the active link. */
  readonly currentPath: string;
}

export function Header({
  navigation,
  currentPath,
}: HeaderProps): React.ReactElement {
  const {
    isMenuOpen,
    isSticky,
    openDropdown,
    toggleMenu,
    closeMenu,
    toggleDropdown,
  } = useNavMenu();

  return (
    <HeaderRender
      navigation={navigation}
      currentPath={currentPath}
      logoText={config.site.logo_text}
      logoSrc={config.site.logo}
      logoAlt={config.site.title}
      isMenuOpen={isMenuOpen}
      isSticky={isSticky}
      openDropdown={openDropdown}
      onToggleMenu={toggleMenu}
      onCloseMenu={closeMenu}
      onToggleDropdown={toggleDropdown}
    />
  );
}

export interface HeaderRenderProps {
  /** Top-level navigation links. */
  readonly navigation: ReadonlyArray<NavigationLink>;
  /** Current page path for active-link styling. */
  readonly currentPath: string;
  /** Logo wordmark text. */
  readonly logoText: string;
  /** Logo image source. */
  readonly logoSrc: string;
  /** Logo image alt text. */
  readonly logoAlt: string;
  /** Whether the mobile drawer is open. */
  readonly isMenuOpen: boolean;
  /** Whether the header is in its scrolled sticky state. */
  readonly isSticky: boolean;
  /** Name of the open dropdown, or null. */
  readonly openDropdown: string | null;
  /** Toggle the mobile drawer. */
  readonly onToggleMenu: () => void;
  /** Close the mobile drawer. */
  readonly onCloseMenu: () => void;
  /** Toggle a named dropdown. */
  readonly onToggleDropdown: (dropdownName: string) => void;
}

export function HeaderRender({
  navigation,
  currentPath,
  logoText,
  logoSrc,
  logoAlt,
  isMenuOpen,
  isSticky,
  openDropdown,
  onToggleMenu,
  onCloseMenu,
  onToggleDropdown,
}: HeaderRenderProps): React.ReactElement {
  const headerClassName = [styles.header, isSticky ? styles.sticky : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <nav className={`container ${styles.navbar}`} aria-label="Main">
        <a href="/" className={styles.logo} aria-label={logoAlt}>
          <img src={logoSrc} alt={logoAlt} width={40} height={40} />
          <span>{logoText}</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={onToggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          className={`${styles.navMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          {navigation.map((link) =>
            link.hasChildren ? (
              <li
                key={link.name}
                className={`${styles.navItem} ${styles.dropdown}`}
              >
                <button
                  type="button"
                  className={`${styles.navLink} ${
                    hasActiveChild(currentPath, link.children)
                      ? styles.active
                      : ""
                  }`}
                  aria-expanded={openDropdown === link.name}
                  onClick={() => onToggleDropdown(link.name)}
                >
                  {link.name}
                  <ChevronDown size={16} />
                </button>
                <ul
                  className={`${styles.dropdownList} ${
                    openDropdown === link.name ? styles.open : ""
                  }`}
                >
                  {link.children?.map((child) => (
                    <li key={child.name}>
                      <a
                        href={child.url}
                        className={`${styles.dropdownLink} ${
                          isLinkActive(currentPath, child.url)
                            ? styles.active
                            : ""
                        }`}
                        onClick={onCloseMenu}
                      >
                        {child.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.name} className={styles.navItem}>
                <a
                  href={link.url}
                  className={`${styles.navLink} ${
                    isLinkActive(currentPath, link.url) ? styles.active : ""
                  }`}
                  onClick={onCloseMenu}
                >
                  {link.name}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
