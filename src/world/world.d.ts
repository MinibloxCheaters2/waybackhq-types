/**
 * WorldProvider.generateLightBrightnessTable with the overworld's zero ambient,
 * which reduces to f / (4 - 3f).
 */
export const LIGHT_BRIGHTNESS_TABLE: Float32Array;
export interface SpawnPoint {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
}
export class World {
	constructor(sizeX: number, sizeY: number, sizeZ: number);
	sizeX: number;
	sizeY: number;
	sizeZ: number;
	blockData: Uint8Array;
	skyLightData: Uint8Array;
	blockLightData: Uint8Array;
	hasBlockLight: boolean;
	entities: Entity[];
	dirty: boolean;
	isClient: boolean;
	spawnPoints: SpawnPoint[];
	name: string;
	floorY?: number;
	skyColor?: number;
	fogColor?: number;
	_boxes: AABB[];
	index(x: number, y: number, z: number): number;
	inBounds(x: number, y: number, z: number): boolean;
	getBlockId(x: number, y: number, z: number): number;
	getBlock(x: number, y: number, z: number): Block;
	setBlock(x: number, y: number, z: number, id: number): void;
	fill(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, id: number): void;
	/**
	 * Port of World.getLightBrightnessForSkyBlocks: the two channels packed the
	 * way the lightmap is indexed, sky in the high half and block in the low.
	 * Outside the world is open sky, which is what stops the arena shell from
	 * shading its own outer faces black.
	 */
	getLightBrightnessForSkyBlocks(x: number, y: number, z: number, minBlockLight: number): number;
	/**
	 * Port of World.getLightBrightness, the scalar the hurt flash is tinted by.
	 * getBlockLightValue takes whichever channel is stronger, with no skylight
	 * subtraction because these arenas never run the night cycle down.
	 */
	getLightBrightness(x: number, y: number, z: number): number;
	/**
	 * Bakes sky light straight down plus a flood fill so overhangs and interiors
	 * darken the way they do in game. Arenas are static so this runs once.
	 */
	computeLighting(): void;
	/** Flood fill outward, losing at least one level per block as vanilla does. */
	propagateLight(data: Uint8Array, queue: number[]): void;
	/**
	 * Port of World.getCollidingBoundingBoxes. Entities are not included as
	 * collision boxes because Entity.getBoundingBox returns null for players.
	 */
	getCollidingBoundingBoxes(entity: Entity, box: AABB): AABB[];
	/** True when any block whose material matches is inside the box. */
	isMaterialInBB(box: AABB, material: string): boolean;
	/**
	 * Voxel traversal ray trace. Returns { blockX, blockY, blockZ, hitVec,
	 * sideHit } or null.
	 */
	rayTraceBlocks(
		start: Vec3,
		end: Vec3,
	): {
		blockX: number;
		blockY: number;
		blockZ: number;
		hitVec: Vec3;
		sideHit: number;
	} | null;
	getEntitiesWithinAABBExcludingEntity(exclude: Entity, box: AABB): Entity[];
	spawnEntity(entity: Entity): Entity;
	removeDeadEntities(): void;
}
import { Vec3 } from "../core/aabb.js";
import { AABB } from "../core/aabb.js";
import { Entity } from "../entity/entity.js";
import { Block } from "./blocks.js";
export { Vec3, AABB };
