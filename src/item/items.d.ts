import type { ItemStack } from "./items.js";
export interface ItemOptions {
	maxStackSize?: number;
	maxDamage?: number;
	texture?: string;
	useAction?: number;
	useDuration?: number;
	attackDamage?: number;
	armorPoints?: number;
	armorSlot?: number;
	full3D?: boolean;
	displayName?: string;
}
export function registerItem(name: string, options?: ItemOptions): Item;
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
	useAction: number;
	useDuration: number;
	attackDamage: number;
	armorPoints: number;
	armorSlot: number;
	full3D: boolean;
	displayName: string;
}
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
	getPotionDef(): {
		effects: {
			id: number;
			duration: number;
			amplifier: number;
		}[];
		splash: boolean;
		color: number;
	} | null;
	getUseAction(): number;
	getMaxItemUseDuration(): number;
	getDisplayName(): string;
}
