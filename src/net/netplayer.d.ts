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
	sprintKeyHeld: boolean;
	teleportHandler: ((x: number, y: number, z: number, yaw: number, pitch: number) => void) | null;
	/** Host side: the position this client reported becomes its position. */
	applyInput(frame: { yaw: number; pitch: number; slot: number }): void;
	/**
	 * Port of EntityPlayerMP.setPositionAndUpdate, which does not move the
	 * entity itself: it hands the position to setPlayerLocation, so the client
	 * that owns this player is told to put itself there. Without this an ender
	 * pearl would move the host's copy while the thrower stayed where it was,
	 * because the client is the authority on its own position.
	 */
	setPositionAndUpdate(x: number, y: number, z: number): void;
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
	/**
	 * Port of EntityOtherPlayerMP.onLivingUpdate. No physics: the position
	 * comes from the owning client, eased toward over several ticks on a
	 * guest, or taken exactly as reported on a host.
	 */
	onLivingUpdate(): void;
	/**
	 * Port of EntityOtherPlayerMP.onUpdate: the walk cycle is rebuilt from the
	 * distance the entity was actually seen to cover, not sent over the wire.
	 *
	 * This applies to both modes. A host is looking at a player it did not
	 * simulate either, so it has to rebuild the walk cycle from observed
	 * movement exactly as a guest does.
	 */
	onUpdate(): void;
}
