import * as THREE from "three";
import { Lightmap } from "./lightmap.js";

export class ParticleSystem {
	constructor();
	world: unknown;
	lightmap: Lightmap;
	particles: Particle[];
	geometry: THREE.InstancedBufferGeometry;
	mesh: THREE.Mesh;
	private _positions: THREE.InstancedBufferAttribute;
	private _motions: THREE.InstancedBufferAttribute;
	private _ageScale: THREE.InstancedBufferAttribute;
	private _colorIndex: THREE.InstancedBufferAttribute;
	private _scales: THREE.InstancedBufferAttribute;
	setWorld(world: unknown): void;
	allocate(): Particle | null;
	spawn(
		x: number,
		y: number,
		z: number,
		mx: number,
		my: number,
		mz: number,
		opts?: {
			r?: number;
			g?: number;
			b?: number;
			gravity?: number;
			textureIndex?: number;
			scale?: number;
			behaviour?: number;
		},
	): Particle | null;
	tick(): void;
	update(partialTicks: number, cameraX: number, cameraY: number, cameraZ: number): void;
	crit(entity: unknown, magic: boolean): void;
	potionSplash(x: number, y: number, z: number, color: number): void;
	pearlImpact(x: number, y: number, z: number): void;
	sprintPuff(entity: unknown, block: { blockX: number; blockY: number; blockZ: number }): void;
	itemUse(entity: unknown, r: number, g: number, b: number): void;
}

export class Particle {
	active: boolean;
	posX: number;
	posY: number;
	posZ: number;
	prevPosX: number;
	prevPosY: number;
	prevPosZ: number;
	motionX: number;
	motionY: number;
	motionZ: number;
	textureIndex: number;
	baseTextureIndex: number;
	scale: number;
	gravity: number;
	age: number;
	maxAge: number;
	r: number;
	g: number;
	b: number;
	onGround: boolean;
	behaviour: number;
	tick(): void;
}

export const TEX_BUBBLE = 0;
export const TEX_FLAME = 1;
export const TEX_SMOKE = 2;
export const TEX_DRIP = 3;
export const TEX_MUSIC = 4;
export const TEX_HEART = 5;
export const TEX_BUBBLE_POP = 6;
export const TEX_FIREWORKS = 7;
export const TEX_SNOW = 8;
export const TEX_DUST = 9;
export const TEX_RAIN = 10;
export const TEX_TORCH = 11;
export const TEX_PORTAL = 12;
export const TEX_FIREWORKS_SPARK = 13;
export const TEX_NOTE = 14;
export const TEX_CRIT = 15;
export const TEX_CRIT_MAGIC = 16;
export const TEX_ENCHANTMENT_TABLE = 17;
export const TEX_SPELL = 18;
export const TEX_SLIME = 19;
export const TEX_ICON_SMOKE = 20;
export const TEX_ICON_HEART_OUTLINE = 21;
export const TEX_ICON_HEART = 22;
export const TEX_ICON_BUBBLE = 23;
export const TEX_ICON_RAIN = 24;
export const TEX_ICON_CRIT = 25;
export const TEX_HEART_BEAT = 26;

export const BEHAVIOUR_NONE = 0;
export const BEHAVIOUR_WATER = 1;
export const BEHAVIOUR_LAVA = 2;
export const BEHAVIOUR_CONTACT_FIRE = 3;
export const BEHAVIOUR_BUBBLE_POP = 4;
export const BEHAVIOUR_PORTAL = 5;
export const BEHAVIOUR_RAIN = 6;
