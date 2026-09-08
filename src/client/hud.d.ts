import { ItemStack } from "../item/items.js";

export class FontRenderer {
	constructor(image: HTMLImageElement, widths: Uint8Array);
	drawTextWithShadow(text: string, x: number, y: number, color?: number): number;
	drawText(text: string, x: number, y: number, color?: number): number;
	drawSplitText(
		text: string,
		x: number,
		y: number,
		maxLines?: number,
		color?: number,
	): { lines: string[]; height: number };
	getLineHeight(): number;
	getStringWidth(text: string): number;
	trimStringToWidth(text: string, maxWidth: number, reverse?: boolean): string;
	drawHoverText(lines: string[], x: number, y: number): void;
}

export class Hud {
	constructor();
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	font: FontRenderer | null;
	effectIcons: HTMLImageElement | null;
	messages: { text: string; color: string; expires: number }[];
	chatLines: { components: ChatComponent[]; created: number }[];
	chatLinks: { x: number; y: number; width: number; height: number; url: string }[];
	highlightStack: ItemStack | null;
	onChatLink?: (url: string) => void;
	resize(width: number, height: number, guiScaleSetting: number, pixelRatio?: number): void;
	blit(
		image: HTMLImageElement,
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
	addChatMessage(text: string | ChatComponent[]): void;
	signature(state: unknown): string;
	render(state: unknown, force?: boolean): void;
}

interface ChatComponent {
	text?: string;
	color?: string;
	bold?: boolean;
	italic?: boolean;
	underlined?: boolean;
	strikethrough?: boolean;
	obfuscated?: boolean;
	clickEvent?: { action: string; value: string };
	hoverEvent?: { action: string; value: unknown };
	extra?: ChatComponent[];
}
