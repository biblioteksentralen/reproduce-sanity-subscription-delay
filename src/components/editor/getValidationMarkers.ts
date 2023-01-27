import { ValidationMarker } from "sanity";

// TODO: pathSegment as PathSegment
export const getValidationMarkers = (
  markers: ValidationMarker[] | undefined,
  pathSegment: string
): ValidationMarker[] | undefined =>
  markers
    ?.filter(({ path }) => path?.[0] === pathSegment)
    .map(({ path, ...marker }) => ({ ...marker, path: path.slice(1) }));
