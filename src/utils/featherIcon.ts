import * as Feather from "react-feather";

const featherIcons = Feather as unknown as Record<string, Feather.Icon>;

/**
 * Resolve a react-feather icon component by its camelCase content name.
 *
 * Content authors reference icons in camelCase (e.g. "messageCircle"), while
 * react-feather exports them in PascalCase ("MessageCircle"). Capitalizing the
 * first character bridges the two.
 *
 * @param iconName - Icon name as authored in content (e.g. "messageCircle", "user").
 * @example
 * ```tsx
 * const Icon = getFeatherIcon("messageCircle");
 * return Icon ? <Icon size={48} /> : null;
 * ```
 */
export function getFeatherIcon(iconName: string): Feather.Icon | undefined {
  if (!iconName) return undefined;
  const pascalName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  return featherIcons[pascalName];
}
