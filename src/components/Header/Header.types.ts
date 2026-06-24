export interface ChildNavigationLink {
  /** Display label for the dropdown entry. */
  readonly name: string;
  /** Destination URL. */
  readonly url: string;
}

export interface NavigationLink {
  /** Display label for the nav item. */
  readonly name: string;
  /** Destination URL. */
  readonly url: string;
  /** Whether this item opens a dropdown of children. */
  readonly hasChildren?: boolean;
  /** Child links shown in the dropdown when `hasChildren` is true. */
  readonly children?: ReadonlyArray<ChildNavigationLink>;
}
