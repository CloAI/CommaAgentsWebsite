export type HubArtifactKind = "agents" | "strategies" | "flows" | "tools";

export interface HubRegistryArtifact {
  readonly id: string;
  readonly ref: string;
  readonly path: string;
  readonly description?: string;
}

export interface HubPerson {
  readonly name: string;
  readonly email?: string;
  readonly url?: string;
}

export interface HubPackage {
  readonly name: string;
  readonly version: string;
  readonly description?: string;
  readonly license?: string;
  readonly path: string;
  readonly author?: HubPerson;
  readonly contributors?: ReadonlyArray<HubPerson>;
  readonly keywords?: ReadonlyArray<string>;
  readonly exports: Readonly<
    Record<HubArtifactKind, ReadonlyArray<HubRegistryArtifact>>
  >;
  readonly environment?: Readonly<
    Record<
      string,
      {
        readonly description?: string;
        readonly required?: boolean;
        readonly default?: string;
        readonly example?: string;
      }
    >
  >;
  readonly permissions?: {
    readonly network?: boolean;
    readonly filesystem?: boolean;
    readonly shell?: boolean;
    readonly executesCode?: boolean;
  };
  readonly links?: {
    readonly homepage?: string;
    readonly repository?: string;
    readonly docs?: string;
    readonly issues?: string;
  };
}

export interface HubRegistry {
  readonly version: number;
  readonly packages: ReadonlyArray<HubPackage>;
}

export interface HubArtifactEntry {
  readonly hubPackage: HubPackage;
  readonly artifact: HubRegistryArtifact;
}
