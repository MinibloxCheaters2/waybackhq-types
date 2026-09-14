import * as THREE from "three";
import { Lightmap } from "./lightmap.js";

/**
 * Item rendering.
 *
 * Items are extruded from their 16x16 sprite exactly like
 * ItemRenderer.renderItemIn2D: a front and back quad plus one thin quad per
 * texture column and row, so transparent texels carve the silhouette out of
 * the slab. Transform stacks for the held item (third person) and the hand
 * (first person) are ported from RenderBiped and ItemRenderer.
 */
declare const THICKNESS = 0.0625;
/**
 * Extrudes a sprite into a slab.
 *
 * Vanilla emits a side quad for every texture column and row and relies on
 * alpha to hide the interior ones; doing that here produced stretched slivers,
 * so the silhouette is walked instead and a side quad is emitted only where an
 * opaque texel borders a transparent one. The result is identical in shape and
 * uses far fewer triangles.
 *
 * Image space maps to model space as x = 1 - col/16, y = 1 - row/16, which
 * reproduces the horizontal mirroring vanilla gets from passing maxU first.
 */
declare function buildExtrudedGeometry(
	imageSource: THREE.Texture | HTMLImageElement | HTMLCanvasElement,
	size?: number,
): THREE.BufferGeometry;
/**
 * A thrown potion or pearl, as RenderSnowball draws it: the sprite at half
 * scale, offset so the origin sits a quarter of the way up it, and turned to
 * face the camera. None of RenderItem's transform applies here, which is what
 * buildHeldItemNode carries and why a projectile cannot reuse it.
 *
 * The caller sets the rotation every frame from the cached view angles.
 */
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
/**
 * Third person held item. The parent is expected to be the right arm node in
 * Minecraft model space (before the -1,-1,1 flip is undone).
 */
export function buildHeldItemNode(
	texture: THREE.Texture,
	full3D: boolean,
	hasGlint?: boolean,
	lightmap?: Lightmap | null,
	blocking?: boolean,
): THREE.Object3D; /**
 * First person item holder. Call updateFirstPerson each frame with the
 * animation inputs; the transform chain matches
 * ItemRenderer.renderItemInFirstPerson.
 */
export class FirstPersonItem {
	constructor(lightmap?: Lightmap | null);
	lightmap: Lightmap | null;
	lightMaterials: THREE.Material[];
	light: THREE.Vector2;
	root: THREE.Object3D;
	swingNode: THREE.Object3D;
	placeNode: THREE.Object3D;
	scaleNode: THREE.Object3D;
	blockA: THREE.Object3D;
	blockB: THREE.Object3D;
	blockC: THREE.Object3D;
	actionNode: THREE.Object3D;
	itemNode: THREE.Object3D | null;
	currentTexture: THREE.Texture | null;
	full3D: boolean;
	currentGlint: boolean;
	glints: THREE.Object3D[];
	armNode: THREE.Object3D;
	armPose: THREE.Object3D;
	armTip: THREE.Object3D;
	armBuilt: boolean;
	armMaterial: THREE.MeshBasicMaterial | null;
	skinTexture: THREE.Texture | undefined;
	itemMaterial: THREE.Material | null;
	setItem(texture: THREE.Texture | null, full3D: boolean, hasGlint?: boolean): void;
	/** The coordinate renderItemInFirstPerson binds before drawing the hand. */
	setLight(coord: THREE.Vector2): void;
	/**
	 * @param {number} swingProgress interpolated swing 0..1
	 * @param {number} equippedProgress interpolated equip 0..1
	 * @param {number} useCount remaining item-in-use ticks
	 * @param {number} maxUse total use duration
	 * @param {string} useAction 'block' | 'eat' | 'drink' | null
	 * @param {number} partialTicks
	 */
	update(
		swingProgress: number,
		equippedProgress: number,
		useCount: number,
		maxUse: number,
		useAction: string | null,
		partialTicks: number,
	): void;
	/**
	 * Port of the branch renderItemInFirstPerson takes with an empty hand,
	 * ending in RenderPlayer.renderFirstPersonArm. The arm swings wider than a
	 * held item and folds through its own rotations, so it shares none of the
	 * nodes above.
	 */
	updateArm(swingProgress: number, equippedProgress: number): void;
	setSkin(texture: THREE.Texture): void;
	updateHeldItem(
		swingProgress: number,
		equippedProgress: number,
		useCount: number,
		maxUse: number,
		useAction: string | null,
		partialTicks: number,
	): void;
}
export { buildExtrudedGeometry, THICKNESS };
