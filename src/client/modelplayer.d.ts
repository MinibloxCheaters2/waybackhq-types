import * as THREE from "three";
import { Lightmap } from "./lightmap.js";

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
export function buildFirstPersonArm(
	lightmap: Lightmap | null,
	skinTexture?: THREE.Texture,
): { object: THREE.Object3D; material: THREE.MeshBasicMaterial };

export class PlayerModel {
	constructor();
	material: THREE.MeshBasicMaterial;
	overlayMaterial: THREE.MeshBasicMaterial;
	armorMaterial1: THREE.MeshBasicMaterial;
	armorMaterial2: THREE.MeshBasicMaterial;
	allMaterials: THREE.MeshBasicMaterial[];
	parts: Record<string, ModelPart>;
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
	setSkin(texture: THREE.Texture): void;
	setGhost(ghost: boolean): void;
	setArmorVisible(helmet: boolean, chest: boolean, legs: boolean, boots: boolean): void;
	setLight(coord: THREE.Vector2, brightness: number, hurt: boolean): void;
}

export class ModelPart {
	constructor(
		parent: THREE.Object3D,
		name: string,
		sizeX: number,
		sizeY: number,
		sizeZ: number,
		texOffU: number,
		texOffV: number,
		scale?: number,
	);
	offset: THREE.Group;
	box: THREE.Object3D;
	boxPivot: THREE.Group;
	overlay: THREE.Object3D;
	overlayPivot: THREE.Group;
	overlayMaterial: THREE.MeshBasicMaterial | null;
	mirrorUV: number;
	mirrorFlip(u: boolean, v: boolean): void;
	sizeX: number;
	sizeY: number;
	sizeZ: number;
	texOffU: number;
	texOffV: number;
	origin: THREE.Vector3;
	rotateAngleX: number;
	rotateAngleY: number;
	rotateAngleZ: number;
	zIndex: number;
	visible: boolean;
	displayThetaX: number;
	displayThetaY: number;
	displayThetaZ: number;
	displayOffsetX: number;
	displayOffsetY: number;
	displayOffsetZ: number;
	tick(partialTicks: number): void;
	/**
	 * Port of ModelBox.render with display transforms stripped out.
	 */
	render(ctx: THREE.Matrix4, scale: number): void;
	showBox(show: boolean): void;
	setShowModel(showModel: boolean): void;
	setLight(coord: THREE.Vector2, scale: number, uv: THREE.Vector2): void;
}
