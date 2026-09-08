import { Lightmap } from "./lightmap.js";
/**
 * Builds one mesh per block texture for the whole world.
 *
 * The lightmap is passed in so terrain materials can be patched to sample it;
 * because the light is a vertex attribute rather than a baked colour, changing
 * the time of day or turning on night vision never brings us back here.
 */
export function buildWorldMesh(
	world: {
		sizeX: number;
		sizeY: number;
		sizeZ: number;
		blockData: Uint8Array;
		index(x: number, y: number, z: number): number;
		getBlock(
			x: number,
			y: number,
			z: number,
		): {
			shape: number;
			opaque: boolean;
			glass?: boolean;
			tex?: string;
			texTop?: string;
			texBottom?: string;
			translucent?: boolean;
		};
		inBounds(x: number, y: number, z: number): boolean;
		getLightBrightnessForSkyBlocks(x: number, y: number, z: number, light: number): number;
	},
	lightmap: Lightmap,
	clearGlass?: boolean,
): THREE.Group;
import * as THREE from "three";
