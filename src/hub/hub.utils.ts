import type {
  HubArtifactEntry,
  HubArtifactKind,
  HubRegistry,
} from "./hub.types";

/** Collect published artifacts of one kind while retaining their package metadata. */
export function getHubArtifacts(
  registry: HubRegistry,
  artifactKind: HubArtifactKind,
): ReadonlyArray<HubArtifactEntry> {
  return registry.packages.flatMap((hubPackage) =>
    hubPackage.exports[artifactKind].map((artifact) => ({
      hubPackage,
      artifact,
    })),
  );
}

/** Build the public detail URL for a published Hub artifact. */
export function getArtifactUrl(
  artifactKind: HubArtifactKind,
  packageName: string,
  artifactId: string,
): string {
  return `/hub/${artifactKind}/${packageName.slice(1)}/${artifactId}`;
}
