import { ItemStack } from "../item/items.js";
import type { ClientPlayer } from "./clientplayer.js";

/**
 * In-game HUD drawn with the vanilla gui textures.
 *
 * The canvas is sized once per resize (never per frame, which is what made the
 * previous build stall) and only redrawn when the underlying state changes.
 * Layout, sprite coordinates and the GUI scale algorithm follow GuiIngame and
 * ScaledResolution from 1.7.10.
 */
export const TEXT_COLORS: {
	white: string;
	gray: string;
	darkGray: string;
	yellow: string;
	red: string;
	green: string;
	aqua: string;
	gold: string;
	shadow: string;
};
/** Port of ScaledResolution: the largest integer scale keeping 320x240. */
export function computeGuiScale(width: number, height: number, setting?: number): number;
/** Renders text from ascii.png with vanilla glyph widths and drop shadow. */
export class FontRenderer {
	constructor();
	image: HTMLImageElement;
	widths: Uint8Array;
	cell: number;
	tinted: Map<string, HTMLCanvasElement>;
	getTinted(color: string): HTMLCanvasElement;
	getStringWidth(text: string): number;
	drawString(
		ctx: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		color?: string,
		shadow?: boolean,
	): number;
	drawRaw(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): void;
	/** Splits a &-formatted string into colour/style runs, like FontRenderer. */
	parseFormat(text: string): {
		text: string;
		color: string | null;
		bold: boolean;
		italic: boolean;
		underline: boolean;
		strikethrough: boolean;
	}[];
	/** Width of a &-formatted string, with bold adding one pixel per glyph. */
	getFormattedWidth(text: string): number;
	/** Draws a &-formatted string, honouring colour, bold and strikethrough. */
	drawFormatted(
		ctx: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		baseColor?: string,
	): number;
	drawGlyph(ctx: CanvasRenderingContext2D, ch: string, x: number, y: number, color: string): void;
	drawCentered(
		ctx: CanvasRenderingContext2D,
		text: string,
		cx: number,
		y: number,
		color: string,
		shadow?: boolean,
	): void;
}

/** The per-frame HUD render state assembled by game/render.js. */
export interface HudRenderState {
	player: ClientPlayer;
	tickCount: number;
	hurtFlash: number;
	matchState: string;
	scoreSelf: number;
	scoreFoe: number;
	showTopScore: boolean;
	scoreLabel: string | null;
	opponentName: string;
	opponentHealth: number;
	effectSignature: string;
	overlayText: string | null;
	overlayColor: string;
	xpLevel: number;
	xpProgress: number;
	localPing: number;
	opponentPing: number;
	scoreboardTitle: string;
	scoreboardLines: string[];
	sideScoreboardVisible: boolean;
	showPlayerList: boolean;
	playerList: { name: string; score: number; ping: number }[];
	showFps: boolean;
	fps: number;
	deathFlashTicks: number;
	chatOpen: boolean;
	chatDraft: string;
	chatCursor: number;
	chatScroll: number;
}

/** A normalized chat component, as produced by normalizeChatComponents. */
export type ChatComponent =
	| { type: "text"; text: string }
	| { type: "link"; text: string; url: string }
	| {
			type: "item";
			name: string;
			potionType: string | null;
			count: number;
			enchantments: Record<string, number>;
	  };

export class Hud {
	constructor(container: HTMLElement);
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	font: FontRenderer | null;
	scale: number;
	pixelRatio: number;
	width: number;
	height: number;
	mouseX: number;
	mouseY: number;
	lastSignature: string;
	effectIcons: HTMLImageElement | null;
	messages: { text: string; color: string; expires: number }[];
	chatLines: { components: ChatComponent[]; created: number }[];
	chatScroll: number;
	chatLinks: { x: number; y: number; width: number; height: number; url: string }[];
	highlightTicks: number;
	highlightStack: ItemStack | null;
	onChatLink?: (url: string) => void;
	/** Must run after the asset store is populated. */
	init(): void;
	loadEffectIcons(): Promise<void>;
	/**
	 * ScaledResolution works off the framebuffer, not off CSS pixels. Backing
	 * the canvas at CSS size on a display above 1x leaves the browser to
	 * stretch it, and that resample is bilinear whatever the 2d context is set
	 * to, which smears every icon and glyph into whatever sits next to it.
	 * Sizing in device pixels and picking the scale from those keeps one GUI
	 * unit an exact whole number of real pixels.
	 */
	resize(width: number, height: number, guiScaleSetting: number, pixelRatio?: number): void;
	blit(
		image: CanvasImageSource,
		dx: number,
		dy: number,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
	): void;
	icon(name: string, dx: number, dy: number): void;
	addMessage(text: string, color?: string): void;
	updateItemHighlight(stack: ItemStack | null): void;
	drawItemHighlight(w: number, h: number): void;
	addChatMessage(text: string | ChatComponent[]): void;
	normalizeChatComponents(message: string | ChatComponent[]): ChatComponent[];
	openChatLink(event: MouseEvent): void;
	/**
	 * Builds a compact signature of everything visible so the HUD is only
	 * repainted when something actually changed.
	 */
	signature(state: HudRenderState): string;
	/**
	 * Messages age out on their own, so the signature carries the next expiry
	 * rather than a free running tick counter. That is what stops the HUD
	 * repainting five times a second when nothing on it has moved.
	 */
	nextMessageExpiry(): 0 | 1;
	render(state: HudRenderState, force?: boolean): void;
	drawCrosshair(w: number, h: number): void;
	drawHotbar(w: number, h: number, player: ClientPlayer): void;
	/**
	 * Port of GuiIngame.renderExperienceBar: bar at (0, 64) / (0, 69) with the
	 * level drawn centred above it with a black outline.
	 */
	drawExpBar(w: number, h: number, state: HudRenderState): void;
	drawStatus(w: number, h: number, player: ClientPlayer): void;
	drawEffects(w: number, h: number, player: ClientPlayer): void;
	drawScoreboard(w: number, h: number, state: HudRenderState): void;
	/**
	 * Port of GuiIngame.func_96136_a with simplified content: a title, plain
	 * one-string lines and an auto-assigned red number on the right of each.
	 * Divider lines (only formatting dashes) draw as one solid bar with no
	 * number, matching its background.
	 */
	drawSideScoreboard(w: number, h: number, state: HudRenderState): void;
	drawMessages(w: number, h: number): void;
	drawChat(w: number, h: number, state: HudRenderState): void;
	drawChatComponents(components: ChatComponent[], x: number, y: number): void;
	chatComponentWidth(component: ChatComponent): number;
	layoutChatLine(components: ChatComponent[]): {
		components: { x: number } & ChatComponent;
		width: number;
		height: number;
		backgroundOffset: number;
	};
	wrapChatLine(
		components: ChatComponent[],
		maxWidth: number,
	): {
		components: { x: number } & ChatComponent;
		width: number;
		height: number;
		backgroundOffset: number;
	}[];
	chatLineWidth(components: ChatComponent[]): number;
	drawFps(fps: number): void;
	drawPlayerList(
		w: number,
		h: number,
		entries: { name: string; score: number; ping: number }[],
	): void;
	drawPing(x: number, y: number, ping: number): void;
}

/**
 * Renders a string with the Minecraft font onto a standalone canvas, used for
 * the in-world nametags.
 *
 * Render.func_147906_a draws one canvas pixel per font pixel and lets the
 * 0.0266 scale do the enlarging, so this canvas is 1:1 too. Supersampling it
 * and shrinking it back down is what made nametags look soft.
 *
 * The backing quad is 0.25 black running from -1 to 8 around the baseline, and
 * the label itself is drawn with the four argument drawString, which passes
 * false for the shadow. Nametags carry a background instead of a shadow.
 */
export function renderTextCanvas(text: string): {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
};
