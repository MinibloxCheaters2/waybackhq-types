import { Entity, DamageSourceType } from "./entity.js";
import { AttributeInstance } from "./attributes.js";
import { PotionEffect } from "./potion.js";
export class EntityLivingBase extends Entity {
	attributes: {
		maxHealth: AttributeInstance;
		knockbackResistance: AttributeInstance;
		movementSpeed: AttributeInstance;
		attackDamage: AttributeInstance;
	};
	health: number;
	prevHealth: number;
	hurtTime: number;
	maxHurtTime: number;
	hurtResistantTime: number;
	maxHurtResistantTime: number;
	lastDamage: number;
	lastDamageWasPlayerAttack: boolean;
	attackedAtYaw: number;
	netCriticalHit: boolean;
	netEnchantmentCritical: boolean;
	deathTime: number;
	recentlyHit: number;
	moveStrafing: number;
	moveForward: number;
	randomYawVelocity: number;
	isJumping: boolean;
	jumpTicks: number;
	jumpMovementFactor: number;
	landMovementFactor: number;
	limbSwing: number;
	limbSwingAmount: number;
	prevLimbSwingAmount: number;
	swingProgress: number;
	prevSwingProgress: number;
	swingProgressInt: number;
	isSwingInProgress: boolean;
	renderYawOffset: number;
	prevRenderYawOffset: number;
	rotationYawHead: number;
	prevRotationYawHead: number;
	onGroundSpeedFactor: number;
	prevOnGroundSpeedFactor: number;
	movedDistance: number;
	activePotionEffects: Map<number, PotionEffect>;
	sprinting: boolean;
	sneaking: boolean;
	applyEntityAttributes(): void;
	getMaxHealth(): number;
	getHealth(): number;
	setHealth(value: number): void;
	heal(amount: number): void;
	setSprinting(value: boolean): void;
	isEntityAlive(): boolean;
	isPotionActive(id: number): boolean;
	getActivePotionEffect(id: number): PotionEffect | null;
	/** Port of EntityLivingBase.addPotionEffect. */
	addPotionEffect(effect: PotionEffect): void;
	/** Port of removePotionEffect: fires the hook so the change is announced. */
	removePotionEffect(id: number): void;
	/** Port of removePotionEffectClient: drops it without announcing. */
	removePotionEffectClient(id: number): void;
	onNewPotionEffect(effect: PotionEffect): void;
	onChangedPotionEffect(effect: PotionEffect, reapply: boolean): void;
	onFinishedPotionEffect(effect: PotionEffect): void;
	clearActivePotions(): void;
	onApplyPotionAttributes(effect: PotionEffect): void;
	onRemovePotionAttributes(effect: PotionEffect): void;
	updatePotionEffects(): void;
	getTotalArmorValue(): number;
	damageArmor(): void;
	getLastActiveItems(): never[];
	/** Port of EntityLivingBase.applyArmorCalculations. */
	applyArmorCalculations(source: DamageSourceType, amount: number): number;
	/** Port of EntityLivingBase.applyPotionDamageCalculations. */
	applyPotionDamageCalculations(source: DamageSourceType, amount: number): number;
	getEnchantmentModifierDamage(): number;
	damageEntity(source: DamageSourceType, amount: number): void;
	/**
	 * Port of EntityLivingBase.attackEntityFrom, including the half-window
	 * rule: while hurtResistantTime is above half, only the amount above the
	 * previous hit lands and no knockback is applied.
	 */
	attackEntityFrom(source: DamageSourceType, amount: number): boolean;
	/**
	 * Port of EntityLivingBase.performHurtAnimation, the half of a hit a client
	 * runs. attackEntityFrom is server side and stops at the isClient check, so
	 * this is the only thing that starts the flinch on a copy of a player that
	 * is driven over the network, and maxHurtTime comes from here rather than
	 * over the wire.
	 */
	performHurtAnimation(): void;
	playHurtOrDeathSound(): void;
	onDeath(): void;
	/** Port of EntityLivingBase.knockBack. */
	knockBack(attacker: Entity | null, damage: number, dx: number, dz: number): void;
	/** Port of EntityLivingBase.jump, including the sprint jump boost. */
	jump(): void;
	getAIMoveSpeed(): number;
	getBlockSlipperiness(): number;
	/**
	 * Port of EntityLivingBase.moveEntityWithHeading. On the ground the
	 * friction is slipperiness * 0.91 (0.546 for normal blocks) and the
	 * acceleration factor 0.16277136 / friction^3 evaluates to exactly 1.0,
	 * which is what produces the 4.317 m/s walk speed.
	 */
	moveEntityWithHeading(strafe: number, forward: number): void;
	isOffsetPositionInLiquid(dx: number, dy: number, dz: number): boolean;
	isMovementBlocked(): boolean;
	resetMovementForTeleport(onGround: boolean): void;
	isClientWorld(): boolean;
	updateEntityActionState(): void;
	/** Port of EntityLivingBase.onLivingUpdate. */
	onLivingUpdate(): void;
	collideWithNearbyEntities(): void;
	/** Port of EntityLivingBase.updateArmSwingProgress. */
	updateArmSwingProgress(): void;
	getArmSwingAnimationEnd(): number;
	swingItem(): void;
	getSwingProgress(partialTicks: number): number;
	/**
	 * Port of func_110146_f. Eases the body toward the direction of travel,
	 * then clamps how far the head may twist away from it before the body is
	 * dragged around to follow.
	 */
	updateBodyYaw(targetYaw: number, sway: number): number;
	onDeathUpdate(): void;
}
export { MOVE_SPEED, FIRE_RESISTANCE, BLINDNESS } from "./potion.js";
