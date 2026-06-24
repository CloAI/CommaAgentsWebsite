export interface BenefitItem {
  /** Card heading. */
  readonly title: string;
  /** Card body copy. */
  readonly content: string;
  /** Accent color used for the icon and its backdrop. */
  readonly color: string;
  /** react-feather icon name (camelCase), e.g. "messageCircle". */
  readonly icon: string;
}

export interface Benefits {
  /** Section heading. */
  readonly title: string;
  /** Section description. */
  readonly description: string;
  /** Individual benefit cards. */
  readonly benefits_list: ReadonlyArray<BenefitItem>;
}
