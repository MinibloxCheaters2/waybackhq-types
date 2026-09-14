import { World } from "../world/world.js";

export interface SchematicData {
	width: number;
	height: number;
	length: number;
	blocks: Uint8Array;
	data: Uint8Array;
	addBlocks: Uint8Array | null;
	tileEntities: Record<string, unknown>[];
}
export function parseNbt(data: ArrayBuffer | Uint8Array): Record<string, unknown>;
export function parseSchematic(data: ArrayBuffer | Uint8Array): SchematicData;
export function getSchematicId(fileName: string): string;
export function getSchematicName(fileName: string): string;
export function buildSchematicWorld(name: string, schematic: SchematicData): World;
