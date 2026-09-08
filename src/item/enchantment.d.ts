import type { ItemStack } from "./items.js";
import type { EntityPlayer } from "../entity/player.js";
import type { DamageSourceType } from "../entity/entity.js";
/** EnchantmentDamage.func_152376_a with damageType 0. */
export function getEnchantmentModifierLiving(heldStack: ItemStack | null): number;
export function getFireAspectModifier(heldStack: ItemStack | null): number;
export function getFireTimeForEntity(entity: EntityPlayer, ticks: number): number;
/** EnchantmentHelper.getEnchantmentModifierDamage over the armour slots. */
export function getEnchantmentModifierDamage(
	armorStacks: (ItemStack | null)[],
	source: DamageSourceType,
): number;
export const SHARPNESS: 16;
export const FIRE_ASPECT: 20;
export const PROTECTION: 0;
export const FIRE_PROTECTION: 1;
export const FEATHER_FALLING: 2;
export const BLAST_PROTECTION: 3;
export const PROJECTILE_PROTECTION: 4;
export const THORNS: 7;
export const UNBREAKING: 34;
