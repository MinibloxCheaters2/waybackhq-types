export function toMinutes(s: unknown): number;
export function parseSkyProperties(text: string): Record<string, string>;
/** Layer opacity at a time, from its fade-in/out windows (may wrap midnight). */
export function layerOpacity(props: Record<string, string>, t: number): number;
/** Returns the world sky colour darkened toward night by the time of day. */
export function skyColorAt(hex: number, timeMinutes: number): number;
/**
 * Builds the sky box textures for a fixed time of day, matching the 1.7.10
 * box sky: the sides fade from the zenith colour to the horizon colour, the
 * roof is the zenith colour and the under-side is the nadir, with the pack's
 * MCPatcher sky layers stitched onto the box faces from their 3x2 cuboid
 * tiles.
 */
export function buildSkyFaces(
	world: { skyColor?: number; fogColor?: number },
	timeMinutes: number,
): Promise<Record<string, HTMLCanvasElement>>;
/** Unit vectors for the sun and moon at a time of day. */
export function sunMoonDirection(timeMinutes: number): {
	sun: THREE.Vector3;
	moon: THREE.Vector3;
};
export function initSky(): Promise<void>;
import * as THREE from "three";
