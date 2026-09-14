import * as THREE from "three";
import { ParticleSystem } from "./particles.js";
import { Lightmap } from "./lightmap.js";
import { FirstPersonItem } from "./itemmodel.js";
import { Vec3 } from "../core/aabb.js";
import { PlayerModel } from "./modelplayer.js";
import type { ClientPlayer } from "./clientplayer.js";
import type { EntityPlayer } from "../entity/player.js";
import type { World } from "../world/world.js";
import type { Entity } from "../entity/entity.js";

declare class PlayerRenderer {
	player: EntityPlayer;
	model: PlayerModel;
	group: THREE.Group;
	fire: THREE.Group;
	heldItemNode: THREE.Object3D | null;
	heldItemKey: string | null;
	nametag: THREE.Sprite | undefined;
	heldItemMaterial: THREE.MeshBasicMaterial | null;
	dispose(scene: THREE.Scene): void;
}

export class WorldRenderer {
	constructor(container: HTMLElement);
	renderer: THREE.WebGLRenderer;
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	worldGroup: THREE.Group | null;
	playerRenderers: Map<number, PlayerRenderer>;
	projectileMeshes: Map<number, THREE.Object3D>;
	itemMeshes: Map<number, THREE.Object3D>;
	lightning: { bolt: THREE.LineSegments; expires: number }[];
	fireFrame: number;
	fireCanvases: HTMLCanvasElement[];
	fireMaterials: THREE.MeshBasicMaterial[];
	particles: ParticleSystem | null;
	lightmap: Lightmap;
	timeMinutes: number;
	nightVision: number;
	firstPerson: FirstPersonItem;
	handScene: THREE.Scene;
	handCamera: THREE.PerspectiveCamera;
	overlayScene: THREE.Scene;
	overlayCamera: THREE.PerspectiveCamera;
	firstPersonFire: THREE.Group | null;
	renderDistanceFog: boolean;
	thirdPerson: number;
	lowFire: boolean;
	clearGlass: boolean;
	fovSetting: number;
	dynamicFov: boolean;
	fovModifierHand: number;
	fovModifierHandPrev: number;
	sky: THREE.Group | null;
	clouds: THREE.Mesh | null;
	skyToken: number;
	pixelRatioScale: number;
	_view: THREE.Matrix4;
	_handView: THREE.Matrix4;
	_step: THREE.Matrix4;
	_camera: { x: number; y: number; z: number; yaw: number; pitch: number };
	_light: THREE.Vector2;
	_rayStart: Vec3;
	_rayEnd: Vec3;
	_rayEye: Vec3;
	selectionBox: THREE.LineSegments;
	world: World | null;
	playerViewY: number;
	playerViewX: number;
	localSkinTexture: THREE.Texture | undefined;
	previewScene: THREE.Scene | undefined;
	previewModel: PlayerModel | undefined;
	previewTransform: THREE.Group | undefined;
	previewPitchTransform: THREE.Group | undefined;
	previewCamera: THREE.OrthographicCamera | undefined;
	previewHeldKey: string | null | undefined;
	previewHeldNode: THREE.Object3D | null | undefined;
	previewViewport: THREE.Vector4 | undefined;
	previewScissor: THREE.Vector4 | undefined;
	setSize(width: number, height: number, resolutionScale?: number): void;
	/**
	 * Port of the block clamp inside orientCamera's third person branch.
	 *
	 * Eight rays leave the eye offset by 0.1 on each axis and run out to where
	 * the camera wants to sit; the nearest thing any of them hits becomes the
	 * distance. The corner offsets are what keep the camera from slipping
	 * through a wall it is looking along rather than at.
	 */
	thirdPersonDistance(eyeX: number, eyeY: number, eyeZ: number, yaw: number, pitch: number): number;
	/**
	 * One tick of EntityRenderer's lightmap upkeep.
	 *
	 * The flicker only moves entries that carry block light, so an arena with
	 * nothing emitting skips it and the texture is never touched again after
	 * the first frame.
	 */
	updateLightmap(): void;
	/** Rebuilds all static geometry for a new arena. */
	setWorld(world: World, timeMinutes: number): void;
	setClearGlass(enabled: boolean): void;
	/**
	 * Builds the sky from the active pack: a box skybox (side gradient, roof,
	 * under-side) plus the sun and moon placed by the fixed time of day, as
	 * the 1.7.10 renderSky does with its box sky and celestial rotation.
	 * Async because pack textures load lazily.
	 */
	buildSky(world: World, timeMinutes: number): Promise<void>;
	/**
	 * Port of EntityRenderer.getFOVModifier plus updateFovModifierHand: the
	 * hand modifier lerps 50% per tick toward the movement-speed ratio.
	 */
	updateFovModifier(player: EntityPlayer): void;
	getFov(player: ClientPlayer, partialTicks: number): number;
	/**
	 * Port of hurtCameraEffect followed by setupViewBobbing, in that order.
	 *
	 * setupCameraTransform and renderHand each run this pair against a fresh
	 * identity modelview, which is why the held item sways with the view
	 * instead of hanging rigidly in front of it.
	 *
	 * Every step post-multiplies, exactly like the glRotatef and glTranslatef
	 * calls it stands in for, so the matrix built here is the vanilla modelview
	 * and inverting it gives the camera.
	 */
	applyViewEffects(
		view: THREE.Matrix4,
		player: ClientPlayer,
		partialTicks: number,
		viewBobbing: boolean,
	): void;
	/** Port of setupCameraTransform: the view effects, then orientCamera. */
	setupCamera(
		player: ClientPlayer,
		partialTicks: number,
		viewBobbing: boolean,
	): { x: number; y: number; z: number; yaw: number; pitch: number };
	/** Updates and draws every visible player. */
	renderPlayers(
		players: EntityPlayer[],
		localPlayer: ClientPlayer,
		partialTicks: number,
		hideLocal: boolean,
	): void;
	/**
	 * Moves the wireframe onto the block the crosshair is on, or hides it when
	 * the crosshair is on an entity or on nothing.
	 */
	updateSelectionBox(
		hit: { block: { blockX: number; blockY: number; blockZ: number } } | null,
	): void;
	/** Thrown potions and pearls, interpolated between ticks. */
	renderProjectiles(entities: Entity[], partialTicks: number): void;
	initFire(): void;
	updateFireTextures(): void;
	renderDroppedItems(entities: Entity[], partialTicks: number): void;
	spawnLightning(x: number, y: number, z: number): void;
	updateLightning(): void;
	/**
	 * Draws the player into the inventory panel, mirroring
	 * GuiInventory.func_147046_a: the model sits at (51, 75) inside the
	 * container at 30 pixels per block and turns to follow the cursor.
	 *
	 * The panel is rendered straight into the main framebuffer through a
	 * scissored viewport, and the 2D inventory canvas punches a hole over the
	 * same rectangle so it shows through.
	 */
	renderInventoryPreview(
		player: EntityPlayer,
		rect: { x: number; y: number; width: number; height: number },
		lookX: number,
		lookY: number,
	): void;
	render(cameraPos: { x: number; y: number; z: number }): void;
}
