import type { ClientPlayer } from "../client/clientplayer.js";

/** Single item definition within a kit loadout. */
export interface KitItem {
	name: string;
	count?: number;
	potion?: string;
	ench?: Record<number, number>;
}

/** The standard no-debuff loadout: Sharpness II diamond sword, Protection II diamond armour with Feather Falling IV boots, pearls, healing splashes, one speed and one fire resistance. */
export const KIT: {
	armor: KitItem[];
	hotbar: KitItem[];
	inventory: KitItem[];
};
export const KILL_REFILL_KIT: {
	armor: KitItem[];
	hotbar: KitItem[];
	inventory: KitItem[];
};
export function applyKit(player: ClientPlayer): void;
export function applyKillRefillKit(player: ClientPlayer): void;
