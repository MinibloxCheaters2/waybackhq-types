import { Entity } from "./entity.js";
import { Vec3 } from "../core/aabb.js";
import { PotionDef } from "./potion.js";
export interface MovingObjectPosition {
	entityHit?: Entity;
	hitVec?: Vec3;
}
export class EntityThrowable extends Entity {
	constructor(world: World, thrower: EntityPlayer | null);
	thrower: EntityPlayer | null;
	ticksInAir: number;
	ticksInGround: number;
	inGround: boolean;
	isNetPuppet: boolean;
	getVelocity(): number;
	/** Potions are launched 20 degrees above the crosshair. */
	getInaccuracyPitch(): number;
	getGravityVelocity(): number;
	setThrowableHeading(x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
	setVelocity(x: number, y: number, z: number): void;
	onImpact(result?: MovingObjectPosition): void;
}
export class EntityEnderPearl extends EntityThrowable {
	/** Port of EntityEnderPearl.onImpact: teleport then 5 points of fall damage. */
	onImpact(result: MovingObjectPosition): void;
}
export class EntityPotion extends EntityThrowable {
	constructor(world: World, thrower: EntityPlayer | null, potionDef: PotionDef | null);
	potionDef: PotionDef | null;
	/**
	 * Port of EntityPotion.onImpact. Everything within 4 blocks is affected
	 * with a linear falloff; a direct hit always counts as full strength.
	 */
	onImpact(result: MovingObjectPosition): void;
}
import { EntityPlayer } from "./player.js";
import { World } from "../world/world.js";
