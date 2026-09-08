import { EntityPlayer } from "../entity/player.js";
import { ParticleSystem } from "./particles.js";
import { ItemStack } from "../item/items.js";

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
	constructor(world: unknown, name: string, options?: { local?: boolean });
	movementInput: MovementInput;
	sprintToggleTimer: number;
	sprintingTicksLeft: number;
	sprintKeyHeld: boolean;
	applyingSprintKnockback: boolean;
	stopSprintingTimer: number;
	isLocal: boolean;
	particles: ParticleSystem | null;
	game: unknown;
	rawInput: {
		forward: boolean;
		back: boolean;
		left: boolean;
		right: boolean;
		jump: boolean;
		sneak: boolean;
	};
	netReplaying: boolean;
	tickSprintKnockback(): void;
	playSoundEvent(kind: string): void;
	playHurtOrDeathSound(isDeath: boolean): void;
	playSoundAt(name: string, volume: number, pitch: number): void;
	onCriticalHit(target: unknown): void;
	onEnchantmentCritical(target: unknown): void;
	onConsumeItem(stack: ItemStack, kind: string): void;
	updateItemUse(stack: ItemStack, count: number): void;
}
