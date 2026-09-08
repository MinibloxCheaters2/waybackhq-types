/**
 * Wire protocol.
 *
 * The session is server authoritative: clients send movement and actions and
 * the dedicated server owns the simulation. Packets are small JSON arrays
 * rather than objects because at 20 Hz the key names would dominate the
 * payload. Every packet is [type, ...fields].
 */
export const PACKET: {
	WELCOME: 1;
	INPUT: 2;
	SNAPSHOT: 3;
	INVENTORY: 4;
	EVENT: 5;
	PING: 6;
	PONG: 7;
	CHAT: 8;
	LEAVE: 9;
	ACTION: 10;
	VELOCITY: 11;
	TELEPORT: 12;
	EFFECT: 13;
	EFFECT_END: 14;
	WINDOW_CLICK: 15;
	ENTITY_TELEPORT: 16;
	CREATE_SERVER: 17;
	JOIN_SERVER: 18;
	GUI: 19;
	SERVER_ERROR: 20;
	PLAYER_JOIN: 21;
	PLAYER_LEAVE: 22;
	RESPAWN: 23;
	SWING: 24;
	CUSTOM_PAYLOAD: 25;
	DISCONNECT: 26;
	STATE_ACK: 34;
};

export const EVENT: {
	HURT: 0;
	DEATH: 1;
	RESPAWN: 2;
	SCORE: 3;
	MATCH_END: 4;
	POTION_SPLASH: 5;
	PEARL_IMPACT: 6;
	SOUND: 7;
	MESSAGE: 8;
	STATE: 9;
	LIGHTNING: 10;
};

/** Bit flags for the movement portion of an input packet. */
export const INPUT_BITS: {
	FORWARD: 1;
	BACK: 2;
	LEFT: 4;
	RIGHT: 8;
	JUMP: 16;
	SNEAK: 32;
	SPRINT: 64;
	USE_DOWN: 128;
	USE_HELD: 256;
	USE_UP: 512;
};

export interface MoveState {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	onGround: boolean;
	sneaking: boolean;
	sprinting: boolean;
	usingItem: boolean;
	slot: number;
	ping: number;
	forward: boolean;
	back: boolean;
	left: boolean;
	right: boolean;
	jump: boolean;
	sneak: boolean;
	sprintKey: boolean;
	sequence: number;
}

export interface DecodedMoveState {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	onGround: boolean;
	sneaking: boolean;
	sprinting: boolean;
	usingItem: boolean;
	slot: number;
	ping: number;
	forward: boolean;
	back: boolean;
	left: boolean;
	right: boolean;
	jump: boolean;
	sneak: boolean;
	sprintKey: boolean;
	sequence: number;
}

export interface ActionState {
	seq: number;
	attacks: number;
	attackTarget: number | null;
	useDown: boolean;
	useUp: boolean;
	drop: number;
	slot: number;
	yaw: number;
	pitch: number;
	stateAck: number;
}

export interface VelocityState {
	x: number;
	y: number;
	z: number;
	id: number | undefined;
}

export interface EffectState {
	potionID: number;
	amplifier: number;
	duration: number;
	id: number;
}

export interface TeleportState {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	id: number | undefined;
	onGround: boolean;
	motionX: number;
	motionY: number;
	motionZ: number;
	fallDistance: number;
}

export interface EntityTeleportState {
	id: number;
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	stateId: number;
}

export interface PlayerStateFlags {
	swingStart: boolean;
	criticalHit: boolean;
	enchantmentCritical: boolean;
}

export interface PlayerState {
	id: number;
	x: number;
	y: number;
	z: number;
	mx: number;
	my: number;
	mz: number;
	yaw: number;
	pitch: number;
	health: number;
	food: number;
	hurtTime: number;
	fireTicks: number;
	sprinting: boolean;
	sneaking: boolean;
	onGround: boolean;
	usingItem: boolean;
	swingStart: boolean;
	criticalHit: boolean;
	enchantmentCritical: boolean;
	slot: number;
	itemInUseCount: number;
}

export interface DecodedProjectile {
	id: number;
	kind: number;
	x: number;
	y: number;
	z: number;
	hasVelocity: boolean;
	motionX: number;
	motionY: number;
	motionZ: number;
	throwerId: number;
}

export interface DecodedEntityItem {
	id: number;
	x: number;
	y: number;
	z: number;
	stack: unknown;
	age: number;
}

export interface SyncEntity {
	id: number;
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
}

export interface WireStack {
	name: string;
	stackSize: number;
	potionType: number;
	enchantments: Record<string, unknown>;
	customName: string | null;
}

/**
 * Discrete actions travel on the reliable channel. Movement can lose a packet
 * without harm because the next one supersedes it, but a swing that is dropped
 * is a swing that never happened, which reads as a hit that did not register.
 */
export function encodeAction(
	seq: number,
	attacks: number | false,
	attackTarget: number | null,
	useDown: boolean,
	useUp: boolean,
	drop: number | false,
	slot: number,
	yaw: number,
	pitch: number,
	stateAck: number,
): unknown[];
export function decodeAction(packet: unknown[]): ActionState;
/**
 * The equivalent of C03PacketPlayer. In 1.7.10 the client owns its own
 * position and reports it; the server validates and accepts rather than
 * simulating the player from inputs.
 */
export function encodeMove(state: MoveState): unknown[];
export function decodeMove(packet: unknown[]): DecodedMoveState;
/** S12PacketEntityVelocity: knockback stays a server decision. */
export function encodeVelocity(
	motionX: number,
	motionY: number,
	motionZ: number,
	id?: number,
): unknown[];
export function decodeVelocity(packet: unknown[]): VelocityState;
/** C0EPacketClickWindow. */
export function encodeWindowClick(slotId: number, button: number, mode: number): unknown[];
export function encodeCustomPayload(channel?: string, payload?: Uint8Array): unknown[];
export function decodeCustomPayload(packet: unknown[]): {
	channel: string;
	payload: Uint8Array;
};
/** S1DPacketEntityEffect. */
export function encodeEffect(
	potionID: number,
	amplifier: number,
	duration: number,
	id: number,
): unknown[];
export function decodeEffect(packet: unknown[]): EffectState;
/** S1EPacketRemoveEntityEffect. */
export function encodeEffectEnd(potionID: number, id: number): unknown[];
/** S08PacketPlayerPosLook: the correction sent when validation rejects a move. */
export function encodeTeleport(
	x: number,
	y: number,
	z: number,
	yaw: number,
	pitch: number,
	id?: number,
	onGround?: boolean,
	motionX?: number,
	motionY?: number,
	motionZ?: number,
	fallDistance?: number,
): unknown[];
export function decodeTeleport(packet: unknown[]): TeleportState;
export function encodeStateAck(id: number): unknown[];
export function encodeDisconnect(reason: string, banned?: boolean): unknown[];
/**
 * S18PacketEntityTeleport. Already fixed point coming out of the tracker, so
 * the fields go on the wire untouched: 1/32 of a block, 1/256 of a turn.
 */
export function encodeEntityTeleport(sync: SyncEntity, stateId: number): unknown[];
export function decodeEntityTeleport(packet: unknown[]): EntityTeleportState;
/** Per-player state inside a snapshot. */
export function encodePlayerState(
	player: {
		entityId: number;
		posX: number;
		posY: number;
		posZ: number;
		motionX: number;
		motionY: number;
		motionZ: number;
		rotationYaw: number;
		rotationPitch: number;
		getHealth(): number;
		foodStats: { getFoodLevel(): number };
		hurtTime: number;
		fire: number;
		isSprinting(): boolean;
		isSneaking(): boolean;
		onGround: boolean;
		isUsingItem(): boolean;
		inventory: { currentItem: number };
		itemInUseCount: number;
	},
	extra: PlayerStateFlags,
): unknown[];
export function decodePlayerState(data: unknown[]): PlayerState;
export function encodeProjectile(
	entity: {
		entityId: number;
		posX: number;
		posY: number;
		posZ: number;
		motionX: number;
		motionY: number;
		motionZ: number;
		thrower: { entityId: number } | null;
	},
	kind: number,
): unknown[];
export function decodeProjectile(data: unknown[]): DecodedProjectile;
export function encodeChat(message: string): unknown[];
export function decodeChat(packet: unknown[]): string | unknown[];
export function encodeGui(name: string, data: unknown): unknown[];
export function encodeEntityItem(entity: {
	entityId: number;
	posX: number;
	posY: number;
	posZ: number;
	stack: unknown;
	age: number;
}): unknown[];
export function decodeEntityItem(data: unknown[]): DecodedEntityItem;
/** Inventory slots are sent as [slot, name, count, potionType] triples. */
export function encodeStack(
	stack:
		| {
				name: string;
				stackSize: number;
				potionType?: number;
				enchantments?: Record<string, unknown>;
				customName?: string | null;
		  }
		| null
		| undefined
		| false,
): unknown[] | 0;
