/**
 * No-debuff bot.
 *
 * Uses the same player class and physics as a human, so it is bound by the
 * same movement, reach and item rules. Behavior models what a competent
 * player does: strafe around the target, w-tap after landing a hit, throw
 * healing potions at its own feet when low, and pearl away when in trouble.
 */
import { ClientPlayer } from "../client/clientplayer.js";
import { EntityPlayer } from "../entity/player.js";
import { ItemStack } from "../item/items.js";

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
	/** Bot decision making runs in place of reading the keyboard. */
	onLivingUpdate(): void;
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
