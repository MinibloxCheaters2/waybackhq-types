import { Connection } from "./connection.js";
import { EventBus } from "../plugin/eventbus.js";
import { Game } from "../game/game.js";
import { ItemStack } from "../item/items.js";
import { EntityItem } from "../entity/item.js";
import { EntityEnderPearl, EntityPotion } from "../entity/throwable.js";

export interface ServerInfo {
	id: string | number;
	endpoint: string;
}

export interface PendingRequest {
	resolve: (value: void) => void;
	reject: (reason?: Error) => void;
	timer: ReturnType<typeof setTimeout>;
}

export interface TeleportTarget {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	onGround: boolean;
}

export interface MatchOptions {
	role: string;
	arenaId: unknown;
	autoClicker: boolean;
	localName: string;
	players: unknown[];
	localEntityId: number;
	localRole: string;
	spawn: {
		x: number;
		y: number;
		z: number;
		yaw: number;
		pitch: number;
	} | null;
	matchState: string | undefined;
	countdown: number | undefined;
	serverData: unknown;
}

export interface EntitySnapshot {
	id: number;
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	mx: number;
	my: number;
	mz: number;
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

export interface DecodedVelocity {
	x: number;
	y: number;
	z: number;
	id: number | undefined;
}

export interface DecodedTeleport {
	x: number;
	y: number;
	z: number;
	yaw: number;
	pitch: number;
	id: number | undefined;
	onGround: boolean;
}

export interface DecodedEffect {
	potionID: number;
	amplifier: number;
	duration: number;
	id: number;
}

export class Session {
	constructor(game: Game);
	game: Game;
	events: EventBus;
	connection: Connection;
	active: boolean;
	server: ServerInfo | null;
	localName: string;
	playerUuid: string;
	serverId: string;
	isOwner: boolean;
	serverTick: number;
	puppetProjectiles: Map<number, EntityEnderPearl | EntityPotion>;
	puppetItems: Map<number, EntityItem>;
	onStatus: ((message: string, isError: boolean) => void) | null;
	onMatchStarted: (() => void) | null;
	onShareToken: ((token: string) => void) | null;
	onDisconnected: ((reason: string, banned: boolean) => void) | null;
	onClosed: (() => void) | null;
	redirecting: boolean;
	suppressDisconnect: boolean;
	packetQueue: unknown[][];
	loadingExtensions: boolean;
	pendingRequest: PendingRequest | null;
	pendingTeleports: unknown[][];
	deferredStatePackets: unknown[][];
	stopped: boolean;
	disconnected: boolean;
	movementSequence: number;
	nextStateAck: number;
	latestStateAck: number;
	appliedState: Set<number>;
	get latencyMs(): number;
	create(name: string, options: unknown): Promise<void>;
	join(
		server: ServerInfo,
		name: string,
		shareToken?: string,
		mode?: string,
		transferToken?: string,
	): Promise<void>;
	sendRequest(packet: unknown[]): Promise<void>;
	settleRequest(error?: Error): void;
	stop(): void;
	handleDisconnect(reason?: string, banned?: boolean): void;
	handlePacket(packet: unknown[]): void;
	redirect(packet: unknown[]): Promise<void>;
	beginMatch(packet: unknown[]): Promise<void>;
	processTeleports(): void;
	markStateApplied(id: number): void;
	sendMove(): void;
	sendActions(
		attacks: number | false,
		attackTarget: number | null,
		useDown: boolean,
		useUp: boolean,
		drop: number | false,
	): void;
	sendRespawn(): void;
	sendSwing(): void;
	sendChat(message: string): void;
	sendWindowClick(slotId: number, button: number, mode: number): void;
	applyEffect(effect: DecodedEffect): void;
	applyEffectEnd(potionID: number): void;
	applyVelocity(velocity: DecodedVelocity): void;
	applyTeleport(target: TeleportTarget): void;
	applyEntityTeleport(sync: {
		id: number;
		x: number;
		y: number;
		z: number;
		yaw: number;
		pitch: number;
	}): void;
	applySnapshot(packet: unknown[]): void;
	applyLocalState(state: EntitySnapshot): void;
	applyInventory(packet: unknown[]): void;
	applyEvent(packet: unknown[]): void;
	syncProjectiles(list: unknown[]): void;
	syncItems(list: unknown[]): void;
}
