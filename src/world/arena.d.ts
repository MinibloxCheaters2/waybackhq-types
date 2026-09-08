/**
 * Classic stone arena: flat quartz-and-stone floor with symmetric pillars.
 */
export function buildClassic(): World;
/**
 * Desert arena: sandstone floor with sunken paths and low walls.
 */
export function buildDesert(): World;
/**
 * Nether-styled arena with obsidian flooring, matching the darker maps common
 * on practice servers.
 */
export function buildObsidian(): World;
export function registerSchematic(
	fileName: string,
	data: ArrayBuffer | Uint8Array,
): {
	id: string;
	name: string;
	build: () => World;
};
export function buildArena(id: string): World;
export const ARENAS: {
	id: string;
	name: string;
	build: () => World;
}[];
import { World } from "./world.js";
