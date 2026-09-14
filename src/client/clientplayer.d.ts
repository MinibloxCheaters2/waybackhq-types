import { EntityPlayer } from "../entity/player.js";
import { ParticleSystem } from "./particles.js";
import { ItemStack } from "../item/items.js";
import type { World } from "../world/world.js";

export class MovementInput {
	moveStrafe: number;
	moveForward: number;
	jump: boolean;
	sneak: boolean;
	/** Port of MovementInputFromOptions.updatePlayerMoveState. */
	update(source: {
		forward: boolean;
		back: boolean;
		left: boolean;
		right: boolean;
		jump: boolean;
		sneak: boolean;
	}): void;
}
export class ClientPlayer extends EntityPlayer {
	constructor(world: World, name: string, options?: { local?: boolean });
	movementInput: MovementInput;
	sprintToggleTimer: number;
	sprintingTicksLeft: number;
	sprintKeyHeld: boolean;
	applyingSprintKnockback: boolean;
	stopSprintingTimer: number;
	isLocal: boolean;
	particles: ParticleSystem | null;
	game: import("../game/game.js").Game | null;
	rawInput: {
		forward: boolean;
		back: boolean;
		left: boolean;
		right: boolean;
		jump: boolean;
		sneak: boolean;
	};
	netReplaying: boolean;
	setSprinting(value: boolean): void;
	tickSprintKnockback(): void;
	isSneaking(): boolean;
	updateEntityActionState(): void;
	/**
	 * Port of EntityPlayerSP.onLivingUpdate: sprint start/stop rules including
	 * the double-tap window and the item-use slowdown.
	 */
	onLivingUpdate(): void;
	playSoundEvent(kind: string): void;
	playHurtOrDeathSound(isDeath: boolean): void;
	playSoundAt(name: string, volume: number, pitch: number): void;
	playStepSound(): void;
	onCriticalHit(target: import("../entity/entity.js").Entity): void;
	onEnchantmentCritical(target: import("../entity/entity.js").Entity): void;
	onConsumeItem(stack: ItemStack, kind: string): void;
	updateItemUse(stack: ItemStack, count: number): void;
	onEntityUpdate(): void;
}
