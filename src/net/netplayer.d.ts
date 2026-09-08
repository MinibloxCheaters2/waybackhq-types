import { ClientPlayer } from "../client/clientplayer.js";

/** NetHandlerPlayClient passes 3 for S14PacketEntity and S18PacketEntityTeleport. */
export const POS_ROTATION_INCREMENTS: 3;
export class NetworkPlayer extends ClientPlayer {
	constructor(world: unknown, name: string, mode: string);
	controlMode: string;
	isPuppet: boolean;
	otherPlayerMPX: number;
	otherPlayerMPY: number;
	otherPlayerMPZ: number;
	otherPlayerMPYaw: number;
	otherPlayerMPPitch: number;
	otherPlayerMPPosRotationIncrements: number;
	pendingSwing: boolean;
	teleportHandler: ((x: number, y: number, z: number, yaw: number, pitch: number) => void) | null;
	/** Host side: the position this client reported becomes its position. */
	applyInput(frame: { yaw: number; pitch: number; slot: number }): void;
	/**
	 * Port of EntityOtherPlayerMP.setPositionAndRotation2, which is func_70056_a.
	 * Stores the target rather than applying it.
	 */
	setPositionAndRotation2(
		x: number,
		y: number,
		z: number,
		yaw: number,
		pitch: number,
		increments: number,
	): void;
	/** Applies the server owned half of a snapshot and queues the movement. */
	acceptSnapshot(state: {
		x: number;
		y: number;
		z: number;
		yaw: number;
		pitch: number;
		hurtTime: number;
		enchantmentCritical: boolean;
		criticalHit: boolean;
		health: number;
		food: number;
		fireTicks: number;
		onGround: boolean;
		sprinting: boolean;
		sneaking: boolean;
		slot: number;
		itemInUseCount: number;
		usingItem: boolean;
		swingStart: boolean;
	}): void;
}
