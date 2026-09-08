import { ClientPlayer } from "../client/clientplayer.js";
import { ItemStack } from "../item/items.js";
import { EntityPlayer } from "../entity/player.js";

export class BotPlayer extends ClientPlayer {
	constructor(world: unknown, name: string, options?: { difficulty?: number });
	target: EntityPlayer | null;
	difficulty: number;
	strafeDirection: number;
	strafeTimer: number;
	attackCooldown: number;
	potionCooldown: number;
	pearlCooldown: number;
	wtapTimer: number;
	aimNoiseYaw: number;
	aimNoisePitch: number;
	reactionDelay: number;
	usingItemTicks: number;
	desiredSlot: number;
	think(): void;
	/** Smooth aim with a small amount of jitter scaled by difficulty. */
	updateAim(dx: number, dy: number, dz: number, distance: number): void;
	updateItems(distance: number): void;
	findSlot(name: string, potionType?: string): number;
	drinkPotion(potionType: string): boolean;
	throwPotion(potionType: string): void;
	throwPearl(): void;
	restock(potionType: string): void;
	updateMovement(distance: number): void;
	updateAttack(distance: number): void;
	/** Same ray test the client uses, so the bot cannot reach further. */
	canReach(target: EntityPlayer): boolean;
	onItemUseFinishHook(): void;
	updateItemUse(stack: ItemStack): void;
}
