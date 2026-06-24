import * as React from "react";
import { ArrowRight } from "react-feather";
import { getFeatherIcon } from "@utils/featherIcon";
import styles from "./HubCategoryCard.module.scss";

export interface HubCategoryCardProps {
  /** Category title, e.g. "Agents". */
  readonly title: string;
  /** Short description of the category. */
  readonly excerpt: string;
  /** react-feather icon name (camelCase) for the category. */
  readonly icon: string;
  /** Accent color for the icon and hover state. */
  readonly color: string;
  /** Destination URL for the category listing. */
  readonly url: string;
}

export function HubCategoryCard({
  title,
  excerpt,
  icon,
  url,
}: HubCategoryCardProps): React.ReactElement {
  const Icon = getFeatherIcon(icon);

  return (
    <a href={url} className={styles.hubCategoryCard}>
      {/* Accent applied via currentColor (SCSS) for a cohesive minimal look. */}
      <span className={styles.iconBackdrop}>
        {Icon && <Icon size={26} />}
      </span>
      <h3 className="h4">{title}</h3>
      <p>{excerpt}</p>
      <span className={styles.cta}>
        Explore <ArrowRight size={16} />
      </span>
    </a>
  );
}
