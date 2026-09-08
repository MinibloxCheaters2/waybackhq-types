import { Entity, DamageSourceType } from "./entity.js";
import { EntityLivingBase } from "./entityliving.js";
import { KnockbackConfig } from "../core/knockback.js";
export interface PotionAttributeModifier {
	attribute: string;
	amount: number;
	operation: number;
	uuid: string;
}
export interface PotionDef {
	effects: {
		id: number;
		duration: number;
		amplifier: number;
	}[];
	splash: boolean;
	color: number;
}
/**
 * Potion registry and effect instances, following net.minecraft.potion.Potion.
 * Only the potions reachable in a no-debuff duel are registered.
 */
export const potionTypes: Potion[];
export const MOVE_SPEED: 1;
export const MOVE_SLOWDOWN: 2;
export const DIG_SPEED: 3;
export const DAMAGE_BOOST: 5;
export const HEAL: 6;
export const HARM: 7;
export const JUMP: 8;
export const REGENERATION: 10;
export const RESISTANCE: 11;
export const FIRE_RESISTANCE: 12;
export const INVISIBILITY: 14;
export const BLINDNESS: 15;
export const ABSORPTION: 22;
export class PotionEffect {
	constructor(potionID: number, duration: number, amplifier?: number, ambient?: boolean);
	potionID: number;
	duration: number;
	amplifier: number;
	isAmbient: boolean;
	isPotionDurationMax: boolean;
	getPotionID(): number;
	getDuration(): number;
	getAmplifier(): number;
	/** Port of PotionEffect.combine. */
	combine(other: PotionEffect): void;
	onUpdate(): boolean;
}
export const POTION_TYPES: Record<string, PotionDef>;
/** Splash potions scale non-instant durations by 0.75, rounded like vanilla. */
export function splashDuration(duration: number): number;
/**
 * Port of Potion.affectEntity for the instant potions. Healing restores
 * (4 << amplifier) scaled by proximity, so Healing II at a direct hit is 8.
 */
export function affectEntity(
	source: Entity | null,
	target: EntityLivingBase,
	potionID: number,
	amplifier: number,
	proximity: number,
	damageSourceFactory: (source: Entity | null) => DamageSourceType,
): void;
export class Potion {
	constructor(id: number, isBadEffect: boolean, liquidColor: number, name: string);
	id: number;
	isBadEffect: boolean;
	liquidColor: number;
	name: string;
	instant: boolean;
	effectiveness: number;
	attributeModifiers: PotionAttributeModifier[];
	iconIndex: number;
	setInstant(): this;
	setIconIndex(col: number, row: number): this;
	/** Mirrors Potion.func_111184_a: attribute, amount, operation. */
	addAttributeModifier(attribute: string, amount: number, operation: number): this;
	/** Amplifier scaling from Potion.func_111183_a. */
	getModifierAmount(amplifier: number, modifier: PotionAttributeModifier): number;
	isReady(duration: number): boolean;
	isInstant(): boolean;
}
