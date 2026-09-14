/**
 * Arena builders. Maps are laid out like typical no-debuff duel arenas: a large
 * open floor with a raised lip, decorative structures that do not obstruct
 * combat, and spawn points facing each other along the long axis.
 */
import { World } from "./world.js";
export interface ArenaEntry {
	id: string;
	name: string;
	build: () => World;
}
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
export const ARENAS: ArenaEntry[];
export function registerSchematic(fileName: string, data: ArrayBuffer | Uint8Array): ArenaEntry;
export function buildArena(id: string): World;
