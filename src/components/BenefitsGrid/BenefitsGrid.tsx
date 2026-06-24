import * as React from "react";
import { getFeatherIcon } from "@utils/featherIcon";
import styles from "./BenefitsGrid.module.scss";
import type { Benefits } from "./BenefitsGrid.types";

export interface BenefitsGridProps {
  /** Benefits section content: heading, description, and the benefit cards. */
  readonly benefits: Benefits;
}

export function BenefitsGrid({
  benefits: { title, description, benefits_list },
}: BenefitsGridProps): React.ReactElement {
  return (
    <section className={`section ${styles.benefitsGrid}`}>
      <div className="container">
        <div className={styles.intro}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <ul className={styles.grid}>
          {benefits_list.map((benefit) => {
            const Icon = getFeatherIcon(benefit.icon);
            return (
              <li key={benefit.title} className={styles.card}>
                {/* Icon inherits the accent via currentColor (set in SCSS) for
                    a cohesive, monochrome minimal look. */}
                <span className={styles.iconBackdrop}>
                  {Icon && <Icon size={28} />}
                </span>
                <h3 className="h4">{benefit.title}</h3>
                <p>{benefit.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
