import { AABB, Vec3 } from "../core/aabb.js";
import { JavaRandom } from "../core/random.js";
/**
 * Port of net.minecraft.entity.Entity for the subset of behaviour a duel needs.
 *
 * posY is the feet position (yOffset is always 0 here), which is equivalent to
 * vanilla's posY/yOffset pair for every calculation below because yOffset only
 * shifts the reference point. ySize is kept because it both gates the step-up
 * logic and drives render smoothing when walking up blocks.
 */
export class Entity {
	constructor(world: World);
	world: World;
	rand: JavaRandom;
	entityId: number;
	isDead: boolean;
	posX: number;
	posY: number;
	posZ: number;
	prevPosX: number;
	prevPosY: number;
	prevPosZ: number;
	lastTickPosX: number;
	lastTickPosY: number;
	lastTickPosZ: number;
	motionX: number;
	motionY: number;
	motionZ: number;
	rotationYaw: number;
	rotationPitch: number;
	prevRotationYaw: number;
	prevRotationPitch: number;
	width: number;
	height: number;
	yOffset: number;
	ySize: number;
	stepHeight: number;
	boundingBox: AABB;
	onGround: boolean;
	isCollided: boolean;
	isCollidedHorizontally: boolean;
	isCollidedVertically: boolean;
	isAirBorne: boolean;
	velocityChanged: boolean;
	noClip: boolean;
	flying: boolean;
	preventEntitySpawning: boolean;
	entityCollisionReduction: number;
	fallDistance: number;
	fire: number;
	isImmuneToFire: boolean;
	inWater: boolean;
	ticksExisted: number;
	distanceWalkedModified: number;
	prevDistanceWalkedModified: number;
	distanceWalkedOnStepModified: number;
	nextStepDistance: number;
	field_70135_K: boolean;
	isPlayer?: boolean;
	setSize(width: number, height: number): void;
	setPosition(x: number, y: number, z: number): void;
	/** Port of Entity.setPositionAndRotation. */
	setPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number): void;
	setLocationAndAngles(x: number, y: number, z: number, yaw: number, pitch: number): void;
	getEyeHeight(): number;
	getCollisionBorderSize(): number;
	canBeCollidedWith(): boolean;
	canBePushed(): boolean;
	setDead(): void;
	setFire(seconds: number): void;
	extinguish(): void;
	isBurning(): boolean;
	isInWater(): boolean;
	isWet(): boolean;
	isOnLadder(): boolean;
	isSneaking(): boolean;
	isSprinting(): boolean;
	canTriggerWalking(): boolean;
	addVelocity(x: number, y: number, z: number): void;
	setBeenAttacked(): void;
	attackEntityFrom(source?: DamageSourceType, amount?: number): boolean;
	/**
	 * Interpolated eye position, matching EntityLivingBase.getPosition. Vanilla
	 * reads prevPos here, the same pair orientCamera uses, so the reach ray
	 * always leaves from wherever the camera was placed this frame.
	 */
	getPosition(partialTicks: number): Vec3;
	/**
	 * The box another player's crosshair is tested against: the 0.6 x 1.8 hull
	 * grown by getCollisionBorderSize, placed where the entity is drawn rather
	 * than where its last tick left it.
	 *
	 * Vanilla expands boundingBox directly, which lags the model by up to a
	 * whole tick, so a moving target has to be led. Offsetting by the same
	 * prevPos to pos interpolation the renderer uses makes what is on screen
	 * and what is hittable the same thing.
	 */
	getTargetBoundingBox(partialTicks: number): AABB;
	/** Unit look vector, matching Entity.getLook. */
	getLook(partialTicks: number): Vec3;
	/**
	 * Port of Entity.getBrightnessForRender: the packed light two thirds of the
	 * way up the box rather than at the feet, so standing in a doorway does not
	 * light a player by the floor tile they happen to be over.
	 */
	getBrightnessForRender(): number;
	/** Port of Entity.getBrightness, sampled at the same point. */
	getBrightness(): number;
	getDistanceSqToEntity(other: Entity): number;
	onUpdate(): void;
	onEntityUpdate(): void;
	handleWaterMovement(): boolean;
	kill(): void;
	/**
	 * Port of Entity.moveEntity. Y is resolved first, then X, then Z, followed
	 * by the step-up retry. Every branch below mirrors the original ordering.
	 */
	moveEntity(dx: number, dy: number, dz: number, updateFall?: boolean): void;
	playStepSound(): void;
	updateFallState(dy: number, onGround: boolean): void;
	fall(): void;
	dealFireDamage(amount: number): void;
	/** Port of Entity.moveFlying: converts strafe/forward input into motion. */
	moveFlying(strafe: number, forward: number, friction: number): void;
	/** Port of Entity.applyEntityCollision, the soft push between players. */
	applyEntityCollision(other: Entity): void;
	static nextId: number;
}

/** Minimal DamageSource registry matching the flags 1.7.10 checks. */
export class DamageSourceType {
	constructor(
		name: string,
		opts?: {
			unblockable?: boolean;
			fire?: boolean;
			projectile?: boolean;
			explosion?: boolean;
			magic?: boolean;
			absolute?: boolean;
			hunger?: number;
			entity?: Entity | null;
			indirectEntity?: Entity | null;
		},
	);
	damageType: string;
	unblockable: boolean;
	fireDamage: boolean;
	projectile: boolean;
	explosion: boolean;
	magicDamage: boolean;
	damageAbsolute: boolean;
	hungerDamage: number;
	entity: Entity | null;
	indirectEntity: Entity | null;
	isUnblockable(): boolean;
	isFireDamage(): boolean;
	isProjectile(): boolean;
	isExplosion(): boolean;
	isDamageAbsolute(): boolean;
	getHungerDamage(): number;
	getEntity(): Entity | null;
	getSourceOfDamage(): Entity | null;
}
export const DamageSource: {
	inFire: DamageSourceType;
	onFire: DamageSourceType;
	fall: DamageSourceType;
	outOfWorld: DamageSourceType;
	starve: DamageSourceType;
	magic: DamageSourceType;
	generic: DamageSourceType;
	causePlayerDamage(player: Entity): DamageSourceType;
	causeThrownDamage(projectile: Entity, thrower: Entity): DamageSourceType;
	causeIndirectMagicDamage(target: Entity, source: Entity): DamageSourceType;
};
import { World } from "../world/world.js";
