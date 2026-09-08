import { EntityPlayer } from "../entity/player.js";
import { FontRenderer } from "./hud.js";
import { ItemStack } from "../item/items.js";

export class InventoryScreen {
	constructor();
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	player: EntityPlayer | null;
	game: unknown;
	font: FontRenderer | null;
	background: HTMLImageElement | null;
	placeholders: Map<string, HTMLCanvasElement>;
	dragSlots: number[];
	lastSignature: string;
	screenCloser: (() => void) | undefined;
	resize(width: number, height: number, guiScaleSetting: number, pixelRatio?: number): void;
	getPreviewRect(pixelRatio: number): { x: number; y: number; width: number; height: number };
	getLookOffset(): { x: number; y: number };
	open(player: EntityPlayer, game: unknown): void;
	close(): void;
	returnToInventory(stack: ItemStack): void;
	getStack(slot: { id: number }): ItemStack | null;
	slotAt(guiX: number, guiY: number): number;
	handleDropKey(wholeStack: boolean): void;
	handleHotbarKey(hotbarIndex: number): void;
	click(slot: { id: number }, shift: boolean): void;
	rightClick(slot: { id: number }): void;
	drawStack(ctx: CanvasRenderingContext2D, stack: ItemStack, x: number, y: number): void;
	drawTooltip(ctx: CanvasRenderingContext2D, stack: ItemStack): void;
}
