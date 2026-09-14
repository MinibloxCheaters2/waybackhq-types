import type { EventBus } from "../plugin/eventbus.js";
import type { WorldRenderer } from "../client/renderer.js";
import type { Hud } from "../client/hud.js";
import type { ChatController } from "../client/chat.js";
import type { InventoryScreen } from "../client/guiinventory.js";
import type { Input } from "../client/input.js";
import type { GameTimer } from "./timer.js";
import type { World } from "../world/world.js";
import type { ClientPlayer } from "../client/clientplayer.js";
import type { NetworkPlayer } from "../net/netplayer.js";
import type { Session } from "../net/session.js";
import type { MouseOverResult } from "./interaction.js";

/** Extension interface: any object with optional lifecycle hooks. */
export interface GameExtension {
	install?(game: Game, container: HTMLElement): void;
	init?(game: Game): void | Promise<void>;
	resize?(game: Game, width: number, height: number, ratio: number): void;
	buildWorld?(game: Game, options: Record<string, unknown>): World | null;
}

export class Game {
	constructor(container: HTMLElement, extensions?: GameExtension[]);
	container: HTMLElement;
	events: EventBus;
	extensions: GameExtension[];
	extensionLoader: ((data: Record<string, unknown>) => Promise<GameExtension | null>) | null;
	extensionKeys: Set<string>;
	renderer: WorldRenderer;
	hud: Hud;
	chat: ChatController;
	inventoryScreen: InventoryScreen;
	input: Input;
	world: World | null;
	players: ClientPlayer[];
	localPlayer: ClientPlayer | null;
	opponent: ClientPlayer | null;
	remotePlayers: Map<string | number, NetworkPlayer>;
	tickCount: number;
	timer: GameTimer;
	partialTicks: number;
	running: boolean;
	paused: boolean;
	currentScreen: string | null;
	currentScreenCloser: (() => void) | null;
	matchState: string;
	countdown: number;
	respawnTimers: Map<string | number, number>;
	deathScreenTicks: number;
	deathFlashTicks: number;
	score: Map<string | number, number>;
	winScore: number;
	rightClickDelayTimer: number;
	remoteRightClickDelay: number;
	objectMouseOver: MouseOverResult | null;
	renderMouseOver: MouseOverResult | null;
	lastSkyTime: number | null;
	session: Session | null;
	netRole: "client" | "host" | null;
	autoClicker: boolean;
	networkData: Record<string, unknown> | null;
	networkPresentation: { lines: string[]; title: string; visible: boolean } | null;
	networkWorldActive: boolean;
	localPing: number;
	opponentPing: number;
	scoreboardTitle: string;
	scoreboardLines: string[];
	settings: {
		fov: number;
		dynamicFov: boolean;
		sensitivity: number;
		invertMouse: boolean;
		keybinds: {
			attack: string;
			use: string;
			forward: string;
			back: string;
			left: string;
			right: string;
			jump: string;
			sneak: string;
			sprint: string;
			inventory: string;
			drop: string;
			perspective: string;
			pause: string;
			chat: string;
			hotbar1: string;
			hotbar2: string;
			hotbar3: string;
			hotbar4: string;
			hotbar5: string;
			hotbar6: string;
			hotbar7: string;
			hotbar8: string;
			hotbar9: string;
		};
		viewBobbing: boolean;
		lowFire: boolean;
		guiScale: number;
		renderScale: number;
		volume: number;
		showFps: boolean;
		autoSprint: boolean;
		frameLimit: number;
		maxPixelRatio: number;
		clearGlass: boolean;
		texturePack: string;
		timeOfDay: number;
	};
	frameTimes: number[];
	tickTimes: number[];
	fps: number;
	tps: number;
	frameTimeMs: number;
	lastRenderTime: number;
	frameChannel: MessageChannel;
	boundLoop: () => void;
	boundClock: () => void;
	clockScheduled: boolean;
	extensionsInitialized: boolean | undefined;
	extensionInitializations: Promise<void> | undefined;
	equippedProgress: number;
	prevEquippedProgress: number;
	equippedSlot: number;
	itemToRender: import("../item/items.js").ItemStack | null;
	pendingNetAttacks: number;
	pendingNetAttackTarget: string | number | null | undefined;
	pendingNetUseDown: boolean;
	pendingNetUseUp: boolean;
	pendingNetDrop: number;
	pointerLockChange: number;
	debugVisible: boolean;
	onPauseChange?: (paused: boolean) => void;
	onMatchEnd?: (won: boolean) => void;
	onPlayerDeath?: () => void;
	onPlayerRespawn?: () => void;
	onDeathScreenReady?: () => void;
	// LoopMethods
	scheduleFrame(): void;
	scheduleClock(): void;
	clockLoop(now?: number): void;
	shouldSimulate(): boolean;
	advanceSimulation(now: number, systemTime?: number): void;
	loop(): void;
	trackFps(now: number): void;
	runTick(): void;
	updateEquippedProgress(): void;
	// MatchMethods
	startMatch(
		arenaId?: string,
		options?: {
			name?: string;
			opponentName?: string;
			difficulty?: number;
			winScore?: number;
		},
	): void;
	beginNetworkMatch(options: {
		role: "client" | "host";
		autoClicker?: boolean;
		serverData?: Record<string, unknown>;
		worldFactory?: () => import("../world/world.js").World;
		arenaId?: string;
		localName: string;
		localRole?: string;
		localEntityId: string | number;
		spawn?: { x: number; y: number; z: number; yaw: number; pitch: number };
		players: Array<{ id: string | number; name: string }>;
		matchState?: string;
		countdown?: number;
	}): Promise<void>;
	addNetworkPlayer(
		entityId: string | number,
		name: string,
		ghost?: boolean,
	): import("../net/netplayer.js").NetworkPlayer;
	endNetworkMatch(): void;
	removeNetworkPlayer(entityId: string | number): void;
	resetPlayer(player: ClientPlayer): void;
	endMatch(winner: import("../entity/player.js").EntityPlayer): void;
	respawnLocalPlayer(): void;
	triggerDeathEffect(x: number, y: number, z: number, localDeath?: boolean): void;
	handleDeaths(): void;
	// ControlMethods
	setupInput(): void;
	openInventory(): void;
	releaseItemUse(): void;
	closeInventory(): void;
	togglePause(): void;
	updateLocalInput(): void;
	setHotbarSlot(slot: number): void;
	applyMouseLook(apply?: boolean): void;
	// InteractionMethods
	clickMouse(): void;
	windowClick(
		player: ClientPlayer,
		slotId: number,
		button: number,
		mode: number,
	): import("../item/items.js").ItemStack | null;
	rightClickMouse(player?: ClientPlayer): void;
	throwPearl(player: ClientPlayer): void;
	throwSplashPotion(player: ClientPlayer, stack: import("../item/items.js").ItemStack): void;
	getMouseOver(partialTicks: number): MouseOverResult | null;
	// RenderMethods
	renderFrame(partialTicks: number): void;
	updateFirstPersonItem(partialTicks: number): void;
	renderHud(): void;
	getDebugInfo(): Record<string, string | number | boolean>;
	setCurrentScreen(screen: string | null, closeCurrent?: (() => void) | null): void;
	init(onProgress?: (progress: number, label: string) => void): Promise<void>;
	/** The game is embedded in a page element, so size from it, not the window. */
	get viewportWidth(): number;
	get viewportHeight(): number;
	handleResize(): void;
	applySettings(): void;
	addExtension(extension: GameExtension): GameExtension | undefined;
	setExtensionLoader(
		loader: ((data: Record<string, unknown>) => Promise<GameExtension | null>) | null,
	): void;
	ensureExtensions(serverData?: Record<string, unknown>): Promise<void>;
	startNetworkExtensions(options: Record<string, unknown>): Promise<void>;
	endNetworkExtensions(): void;
}
