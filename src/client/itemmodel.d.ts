import * as THREE from "three";
import { Lightmap } from "./lightmap.js";

export function buildProjectileNode(
	texture: THREE.Texture,
	lightmap: Lightmap,
	hasGlint?: boolean,
): THREE.Object3D;
export function buildDroppedItemNode(
	texture: THREE.Texture,
	hasGlint: boolean,
	lightmap: Lightmap,
): THREE.Object3D;
export function buildHeldItemNode(
	texture: THREE.Texture,
	full3D: boolean,
	hasGlint?: boolean,
	lightmap?: Lightmap | null,
	blocking?: boolean,
): THREE.Object3D;

export class FirstPersonItem {
	constructor();
	lightmap: Lightmap | null;
	lightMaterials: THREE.MeshBasicMaterial[];
	currentTexture: THREE.Texture | null;
	glints: THREE.Object3D[];
	itemMaterial: THREE.MeshBasicMaterial | null;
	setItem(texture: THREE.Texture | null, full3D: boolean, hasGlint?: boolean): void;
	setLight(coord: THREE.Vector2): void;
	setSkin(texture: THREE.Texture): void;
}
