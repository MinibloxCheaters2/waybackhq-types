import * as THREE from "three";
import type { World } from "../world/world.js";
import type { Entity } from "../entity/entity.js";

/**
 * Particle system.
 *
 * Particles use the vanilla physics (gravity 0.04 * scale, 0.98 drag per tick,
 * 0.7 ground friction) and the vanilla sprite sheet, which is an 8x8 pixel
 * grid inside particles.png. Rendering is a single instanced draw call with
 * billboarding done in the vertex shader, so thousands of particles cost one
 * draw and no per-frame CPU vertex work.
 */
export const TEX_SMOKE: 0;
export const TEX_CRIT: 65;
export const TEX_SPELL: 128;
export const TEX_INSTANT_SPELL: 144;
export const TEX_PORTAL: 0;
export const TEX_SPLASH: 32;
export const BEHAVIOUR_DEFAULT: 0;
export const BEHAVIOUR_CRIT: 1;
export const BEHAVIOUR_SPELL: 2;

declare class Particle {
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
	constructor();
	spawn(
		x: number,
		y: number,
		z: number,
		mx: number,
		my: number,
		mz: number,
		textureIndex: number,
		scale: number,
		gravity: number,
		maxAge: number,
		r: number,
		g: number,
		b: number,
		behaviour: number,
	): void;
}

export class ParticleSystem {
	constructor(scene: THREE.Scene, world: World, lightmap: import("./lightmap.js").Lightmap);
	world: World;
	lightmap: import("./lightmap.js").Lightmap;
	particles: Particle[];
	count: number;
	_light: THREE.Vector2;
	iPosition: THREE.InstancedBufferAttribute;
	iColor: THREE.InstancedBufferAttribute;
	iUv: THREE.InstancedBufferAttribute;
	iScale: THREE.InstancedBufferAttribute;
	iAlpha: THREE.InstancedBufferAttribute;
	iLight: THREE.InstancedBufferAttribute;
	geometry: THREE.InstancedBufferGeometry;
	mesh: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;
	setWorld(world: World): void;
	allocate(): Particle | null;
	spawn(
		x: number,
		y: number,
		z: number,
		mx: number,
		my: number,
		mz: number,
		opts?: {
			texture?: number;
			scale?: number;
			gravity?: number;
			maxAge?: number;
			r?: number;
			g?: number;
			b?: number;
			behaviour?: number;
		},
	): Particle | null;
	/**
	 * Port of EntityFX.onUpdate plus the per-type overrides from
	 * EntityCritFX and EntitySpellParticleFX.
	 */
	tick(): void;
	/** Cheap swept collision: particles only need to stop at solid blocks. */
	moveParticle(p: Particle): void;
	/** Writes interpolated instance data for the current frame. */
	update(partialTicks: number, cameraX: number, cameraY: number, cameraZ: number): void;
	/**
	 * Port of RenderGlobal's 'crit' and 'magicCrit' spawns, which
	 * onCriticalHit / onEnchantmentCritical trigger.
	 *
	 * EntityCritFX starts as a random grey between 0.6 and 0.9 and lets
	 * onUpdate cool it toward orange. magicCrit then takes red down to 0.3 and
	 * green to 0.8 and leaves blue alone, which is what makes it read blue, and
	 * steps one sprite along the row with nextTextureIndexX.
	 */
	crit(entity: Entity, magic: boolean): void;
	/**
	 * Port of playAuxSFX 2002: 100 spell particles spread across a 4 block
	 * disc, tinted by the potion's liquid colour with a random shade.
	 */
	potionSplash(x: number, y: number, z: number, color: number): void;
	/** EntityEnderPearl.onImpact spawns 32 portal particles. */
	pearlImpact(x: number, y: number, z: number): void;
	/**
	 * Sprint trail, from Entity.onEntityUpdate.
	 *
	 * Position, motion and the 0.6 grey are the original's, but the sprite is
	 * not: vanilla spawns blockcrack_<id>_<meta>, an EntityDiggingFX that
	 * samples a random quarter of the block it is running on off the terrain
	 * atlas. That needs a second FX layer with its own texture, which this
	 * system does not have yet, so it borrows the generic puff.
	 */
	sprintPuff(entity: Entity, block: { blockX: number; blockY: number; blockZ: number }): void;
	/** Bubbles / smoke used for eating and drinking feedback. */
	itemUse(entity: Entity, r: number, g: number, b: number): void;
}
