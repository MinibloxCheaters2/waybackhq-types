import * as THREE from "three";
import { Lightmap } from "./lightmap.js";

/**
 * ModelBiped rendered with three.js, kept in Minecraft model space.
 *
 * The scene graph mirrors what RendererLivingEntity does:
 *   root      -> translate to entity position, rotate (180 - renderYawOffset)
 *   flipNode  -> glScalef(-1, -1, 1)
 *   offset    -> glTranslatef(0, -24 * 0.0625, 0)
 *   parts     -> ModelRenderer nodes in model units (1 unit = 1/16 block)
 *
 * Because scale(-1,-1,1) has a positive determinant it is a pure rotation, so
 * face winding is preserved and no material side flipping is needed. Box UVs
 * follow ModelBox's quad layout exactly.
 */
export const MODEL_SCALE: 0.0625;
/**
 * Builds a box in model space. Vertices and per-face UV rectangles reproduce
 * ModelBox's six TexturedQuads.
 */
export function buildModelBox(
	offX: number,
	offY: number,
	offZ: number,
	w: number,
	h: number,
	d: number,
	texU: number,
	texV: number,
	expand: number,
	texW?: number,
	texH?: number,
): THREE.BufferGeometry;

/** A ModelRenderer node: pivot plus one box, rotated Z then Y then X. */
declare class ModelPart {
	object: THREE.Object3D;
	mesh: THREE.Mesh;
	defaultPoint: { x: number; y: number; z: number };
	glints: THREE.Object3D[] | undefined;
	constructor(
		material: THREE.Material,
		box: {
			x: number;
			y: number;
			z: number;
			w: number;
			h: number;
			d: number;
			u: number;
			v: number;
			expand?: number;
		},
		texW: number,
		texH: number,
	);
	setRotationPoint(x: number, y: number, z: number): void;
	setAngles(x: number, y: number, z: number): void;
	addGlint(): void;
}

/**
 * The right arm on its own, as RenderPlayer.renderFirstPersonArm draws it.
 *
 * That method calls setRotationAngles with every argument zero and onGround
 * zero beforehand, so bipedRightArm keeps its rest pose and only the pivot
 * matters. No armour layer is drawn and none of the flips RendererLivingEntity
 * applies are in scope here, because the caller in ItemRenderer orients the arm
 * itself.
 */
export function buildFirstPersonArm(
	lightmap: Lightmap | null,
	skinTexture?: THREE.Texture,
): { object: THREE.Object3D; material: THREE.MeshBasicMaterial };

export class PlayerModel {
	lightmap: Lightmap | null;
	root: THREE.Group;
	flipNode: THREE.Object3D;
	offsetNode: THREE.Object3D;
	material: THREE.MeshBasicMaterial;
	overlayMaterial: THREE.MeshBasicMaterial;
	armorMaterial1: THREE.MeshBasicMaterial;
	armorMaterial2: THREE.MeshBasicMaterial;
	allMaterials: THREE.MeshBasicMaterial[];
	parts: Record<string, ModelPart>;
	itemAttachment: THREE.Object3D;
	baseColor: THREE.Color;
	armor: {
		helmet: ModelPart;
		chest: ModelPart;
		rightSleeve: ModelPart;
		leftSleeve: ModelPart;
		waist: ModelPart;
		rightPant: ModelPart;
		leftPant: ModelPart;
		rightBoot: ModelPart;
		leftBoot: ModelPart;
	};
	/**
	 * @param {Lightmap} [lightmap] omitted for the inventory preview, which
	 * GuiInventory draws under its own lighting rather than the world's.
	 */
	constructor(lightmap?: Lightmap | null);
	/** Diamond armour: layer 1 for helmet, chest and boots; layer 2 for legs. */
	buildArmor(): void;
	setSkin(texture: THREE.Texture): void;
	setGhost(ghost: boolean): void;
	setArmorVisible(helmet: boolean, chest: boolean, legs: boolean, boots: boolean): void;
	/** Port of ModelBiped.setRotationAngles. */
	setRotationAngles(
		limbSwing: number,
		limbSwingAmount: number,
		ageInTicks: number,
		netHeadYaw: number,
		headPitch: number,
		swingProgress: number,
		heldItemRight: number,
		isSneak: boolean,
	): void;
	/**
	 * Applies the light level tint and the hurt overlay. The overlay is the
	 * 40% (brightness, 0, 0) pass vanilla blends over the model while
	 * hurtTime or deathTime is running.
	 *
	 * The lightmap now supplies the shading, so the base colour stays white and
	 * only the hurt flash uses the scalar, which is what RendererLivingEntity
	 * passes to glColor4f alongside its own lightmap coordinate.
	 */
	setLight(coord: THREE.Vector2, brightness: number, hurt: boolean): void;
	/** Animates the armour glint with the entity age in ticks. */
	updateGlint(ageTicks: number): void;
	dispose(): void;
}
