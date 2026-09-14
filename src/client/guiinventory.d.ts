import { EntityPlayer } from "../entity/player.js";
import { FontRenderer } from "./hud.js";
import { ItemStack } from "../item/items.js";
import type { Game } from "../game/game.js";

export class InventoryScreen {
	constructor(container: HTMLElement);
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	slots: { id: number; x: number; y: number }[];
	isOpen: boolean;
	player: EntityPlayer | null;
	game: Game | null;
	hoverSlot: number;
	leftDown: boolean;
	mouseX: number;
	mouseY: number;
	scale: number;
	pixelRatio: number;
	originX: number;
	originY: number;
	font: FontRenderer | null;
	background: HTMLImageElement | null;
	placeholders: Map<string, HTMLImageElement>;
	dragging: boolean;
	dragButton: number;
	dragSlots: number[];
	lastClickSlot: number;
	lastClickButton: number;
	lastClickTime: number;
	lastSignature: string;
	screenCloser: (() => void) | undefined;
	init(): void;
	/** Backed in device pixels for the same reason Hud.resize is. */
	resize(width: number, height: number, guiScaleSetting: number, pixelRatio?: number): void;
	/**
	 * Preview rectangle in framebuffer pixels, with the origin at the bottom
	 * left the way WebGL scissor expects.
	 */
	getPreviewRect(pixelRatio: number): { x: number; y: number; width: number; height: number };
	/** Cursor offset from the panel centre, used to turn the preview model. */
	getLookOffset(): { x: number; y: number };
	open(player: EntityPlayer, game: Game): void;
	close(): void;
	returnToInventory(stack: ItemStack): void;
	getStack(slot: { id: number }): ItemStack | null;
	slotAt(guiX: number, guiY: number): number;
	/** True when the cursor is outside the panel, which vanilla treats as -999. */
	isOutside(): boolean;
	bindEvents(): void;
	endDrag(): void;
	/**
	 * Release: a drag over a single slot is just an ordinary click, anything
	 * wider goes through mode 5. Left splits the stack evenly between the
	 * slots, right leaves one in each.
	 */
	commitDrag(): void;
	/** Q throws one item from the hovered slot, Ctrl+Q the whole stack. */
	handleDropKey(wholeStack: boolean): void;
	/** Number keys swap the hovered slot with a hotbar slot, like vanilla. */
	handleHotbarKey(hotbarIndex: number): void;
	click(slot: { id: number }, shift: boolean): void;
	rightClick(slot: { id: number }): void;
	autoClick(): void;
	/**
	 * What the panel actually shows. Anything not in here cannot change the
	 * pixels, so a frame whose hash matches the last one has nothing to draw.
	 * The cursor stack and hovered slot are included because both move with the
	 * mouse while the rest of the panel sits still.
	 */
	signature(): string;
	render(force?: boolean): void;
	drawStack(ctx: CanvasRenderingContext2D, stack: ItemStack, x: number, y: number): void;
	drawTooltip(ctx: CanvasRenderingContext2D, stack: ItemStack): void;
}
