import { FontRenderer } from "../client/hud.js";
import { KnockbackScreen } from "./knockback.js";
import { Session } from "../net/session.js";
import { Game } from "../game/index.js";
import { DeathScreen } from "../client/deathscreen.js";

interface ButtonDef {
	id: string;
	label: string;
	x: number;
	y: number;
	w: number;
	h: number;
	action: () => void;
	enabled: boolean;
}

interface ServerInfo {
	id: string | number;
	name: string;
	label: string;
	arenaName: string;
	kind: string;
	players: number;
	maxPlayers: number;
	ping: number;
	private: boolean;
	duels: number;
	playerNames: string[];
}

export class MinecraftUI {
	constructor(canvas: HTMLCanvasElement, game: Game, deathScreen: DeathScreen);
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	game: Game;
	deathScreen: DeathScreen;
	font: FontRenderer | null;
	screenCloser: () => void;
	returnScreen: string;
	buttons: ButtonDef[];
	rows: unknown[];
	hovered: string | null;
	mouseX: number;
	mouseY: number;
	width: number;
	height: number;
	scale: number;
	loading: number;
	loadingLabel: string;
	error: string;
	splash: string | undefined;
	playerName: string;
	editingName: boolean;
	privateEnabled: boolean;
	createdShareLink: string;
	createdShareVisible: boolean;
	copyStatus: string;
	linkConfirmationUrl: string;
	linkCopyStatus: string;
	linkCopyLabel: string;
	linkCopyTimer: ReturnType<typeof setTimeout> | null;
	disconnectReason: string;
	disconnectBanned: boolean;
	arenaIndex: number;
	difficultyIndex: number;
	winScoreIndex: number;
	optionPage: number;
	controlScroll: number;
	bindingAction: string | null;
	packs: {
		id: string;
		name: string;
		description: string;
		logo: string | null;
		file: string | null;
	}[];
	packIndex: number;
	servers: ServerInfo[];
	serverSelection: number;
	serverScroll: number;
	serverStatus: string;
	lastServerClick: number;
	connectionPending: boolean;
	autoClicker: boolean;
	anticheat: boolean;
	session: Session | null;
	knockbackScreen: KnockbackScreen;
	panoramaWorld: import("../world/world.js").World | null;
	panoramaArena: number;
	panoramaStart: number;
	lastPanoramaCycle: number;
	running: boolean;
	resultWon: boolean | undefined;
	optionSliders: Record<string, import("./widgets/slider.js").MinecraftSlider>;
	multiplayerNamePrompt: boolean;
	nameContinue: (() => void) | null;
	nameReturnScreen: string;
	nameDraft: string;
	init(): void;
	bindGame(): void;
	show(screen: string, returnScreen?: string): void;
	hide(): void;
	start(): void;
	frame(time: number): void;
	resize(): void;
	preparePanorama(): void;
	renderPanorama(time: number): void;
	bindEvents(): void;
	keyDown(event: KeyboardEvent): void;
	closeCurrentScreen(): void;
	handlePaste(event: ClipboardEvent): void;
	pasteFromClipboard(field: string): Promise<void>;
	appendText(field: string, pasted: string): void;
	resetCursor(): void;
	closePause(): void;
	point(event: MouseEvent): { x: number; y: number };
	hitButton(x: number, y: number): ButtonDef | null;
	button(
		id: string,
		label: string,
		x: number,
		y: number,
		w: number,
		action: () => void,
		enabled?: boolean,
		renderScale?: number,
		labelColor?: string | null,
	): ButtonDef;
	checkbox(
		id: string,
		label: string,
		x: number,
		y: number,
		w: number,
		checked: boolean,
		action: () => void,
	): void;
	field(id: string, value: string, x: number, y: number, w: number, action: () => void): void;
	draw(): void;
	drawBackground(): void;
	title(text: string, y?: number): void;
	drawWaybackLogo(y: number): void;
	// ScreenMethods (mixed in from screens/index.js)
	showLoading(): void;
	setLoading(progress: number, label: string): void;
	setError(text: string): void;
	drawLoading(): void;
	drawMain(): void;
	drawSolo(): void;
	startSolo(): void;
	drawMultiplayer(): void;
	openMultiplayerScreen(): void;
	refreshServers(): Promise<void>;
	drawServers(): void;
	isPingHover(x: number, y: number): boolean;
	drawServerTooltip(lines: string[]): void;
	drawPingBars(x: number, y: number, ping: number): void;
	newSession(): import("../net/session.js").Session;
	createServer(): Promise<void>;
	drawPrivateLabel(right: number, y: number): void;
	joinServer(server: unknown, shareToken?: string): Promise<void>;
	joinShareLink(): Promise<void>;
	teardownSession(): void;
	optionLabel(key: string, label: string): string;
	cycleOption(def: [string, string, [number, number, number] | undefined]): void;
	drawOptions(): void;
	ensureOptionSlider(
		key: string,
		label: string,
		range: [number, number, number],
		x: number,
		y: number,
	): void;
	getSliderValue(key: string, range: [number, number, number]): number;
	setSliderValue(key: string, value: number): void;
	applySettings(): void;
	saveSettings(): void;
	drawSounds(): void;
	drawControls(): void;
	loadPacks(): Promise<void>;
	drawPacks(): void;
	packLogo(pack: {
		id: string;
		name: string;
		description: string;
		logo: string | null;
		file: string | null;
		_image?: HTMLImageElement;
	}): HTMLImageElement;
	drawReloading(): void;
	drawPause(): void;
	drawResult(): void;
	leaveMatch(): void;
	openNameScreen(returnScreen: string): void;
	needsMultiplayerNamePrompt(): boolean;
	openMultiplayerNamePrompt(continueAction: () => void): void;
	drawName(): void;
	finishNameEdit(): void;
	cancelNameEdit(): void;
	receiveCreatedShareToken(token: string): void;
	toggleCreatedShare(): void;
	copyCreatedShare(): Promise<void>;
	continueCreatedShare(): void;
	drawShareCreated(): void;
	shareField(value: string, x: number, y: number): void;
	openLinkConfirmation(url: string): void;
	copyConfirmationLink(): Promise<void>;
	confirmLinkOpen(): void;
	closeLinkConfirmation(): void;
	drawLinkConfirmation(): void;
	drawCenteredLines(lines: string[], y: number, color: string, lineHeight: number): number;
	wrapText(text: string, maxWidth: number): string[];
	drawDisconnect(): void;
	drawDisconnectReason(reason: string, centerX: number, startY: number): void;
}
