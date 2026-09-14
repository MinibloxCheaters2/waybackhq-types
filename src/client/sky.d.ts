import * as THREE from "three";
import type { World } from "../world/world.js";

/**
 * Sky rendering for texture packs.
 *
 * Supports the MCPatcher-style sky packs ship: the base colour comes from the
 * `mcpatcher/colormap/sky0.png` column for the current time of day, and each
 * `mcpatcher/sky/world0/skyN.properties` layer (clouds, starfield) is blended
 * over it with its add / screen / multiply mode and time-based fade. Layers
 * are cuboid skyboxes: the image is a 3x2 grid of tiles that get stitched
 * onto the six faces of the sky box, exactly like MCPatcher's Better Skies.
 * The result is composited once into the box sky textures, with the sun and
 * moon placed by the time of day.
 */
export function toMinutes(s: string): number;
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
	world: World,
	timeMinutes: number,
): Promise<{
	px: HTMLCanvasElement;
	nx: HTMLCanvasElement;
	py: HTMLCanvasElement;
	pz: HTMLCanvasElement;
	nz: HTMLCanvasElement;
	ny: HTMLCanvasElement;
}>;
/** Unit vectors for the sun and moon at a time of day. */
export function sunMoonDirection(timeMinutes: number): {
	sun: THREE.Vector3;
	moon: THREE.Vector3;
};
export function initSky(): Promise<void>;
