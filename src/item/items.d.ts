import type { PotionDef } from "../entity/potion.js";
export type UseAction = 0 | 1 | 2 | 3 | 4;
export interface ItemOptions {
	maxStackSize?: number;
	maxDamage?: number;
	texture?: string;
	useAction?: UseAction;
	useDuration?: number;
	attackDamage?: number;
	armorPoints?: number;
	armorSlot?: number;
	full3D?: boolean;
	displayName?: string;
}
export const ACTION_NONE: 0;
export const ACTION_EAT: 1;
export const ACTION_DRINK: 2;
export const ACTION_BLOCK: 3;
export const ACTION_BOW: 4;
export const items: Map<string, Item>;
export class Item {
	constructor(name: string, opts?: ItemOptions);
	name: string;
	maxStackSize: number;
	maxDamage: number;
	texture: string;
	useAction: UseAction;
	useDuration: number;
	attackDamage: number;
	armorPoints: number;
	armorSlot: number;
	full3D: boolean;
	displayName: string;
}
export function registerItem(name: string, options?: ItemOptions): Item;
/** Hunger and saturation restored by each food item. */
export const FOOD_VALUES: {
	golden_carrot: {
		hunger: number;
		saturationModifier: number;
	};
	golden_apple: {
		hunger: number;
		saturationModifier: number;
	};
};
export class ItemStack {
	constructor(name: string, stackSize?: number, potionType?: string | null);
	item: Item;
	name: string;
	stackSize: number;
	itemDamage: number;
	potionType: string | null;
	enchantments: Record<string, number>;
	customName: string | null;
	copy(): ItemStack;
	setCustomName(name: string): this;
	enchant(id: string, level: number): this;
	getEnchantment(id: string): number;
	hasEffect(): boolean;
	isSplash(): boolean;
	getPotionDef(): PotionDef | null;
	getUseAction(): UseAction;
	getMaxItemUseDuration(): number;
	getDisplayName(): string;
}
