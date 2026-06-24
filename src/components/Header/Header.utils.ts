import type { ChildNavigationLink } from "./Header.types";

/** Whether a nav URL matches the current path, tolerating a trailing slash. */
export function isLinkActive(currentPath: string, url: string): boolean {
  return currentPath === url || currentPath === `${url}/`;
}

/** Whether any child link in a dropdown matches the current path. */
export function hasActiveChild(
  currentPath: string,
  children: ReadonlyArray<ChildNavigationLink> | undefined,
): boolean {
  return (children ?? []).some((child) => isLinkActive(currentPath, child.url));
}
