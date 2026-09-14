import type { Game } from "../game/game.js";
import { FontRenderer } from "./hud.js";

export class DeathScreen {
	constructor(canvas: HTMLCanvasElement, game: Game);
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	game: Game;
	screenCloser: () => void;
	font: FontRenderer | null;
	scale: number;
	width: number;
	height: number;
	mouseX: number;
	mouseY: number;
	score: number;
	ready: boolean;
	hovered: string | null;
	onRespawn: (() => void) | null;
	onTitle: (() => void) | null;
	flashUntil: number;
	init(): void;
	resize(width: number, height: number, setting: number): void;
	show(score: number): void;
	hide(): void;
	animateFlash(): void;
	setReady(ready: boolean): void;
	logicalPosition(event: MouseEvent): { x: number; y: number };
	buttonAt(x: number, y: number): { id: string; label: string; y: number } | null;
	onMouseMove(event: MouseEvent): void;
	onClick(event: MouseEvent): void;
	drawGradient(): void;
	drawSegments(segments: { text: string; color: string }[], center: number, y: number): void;
	drawButton(button: { id: string; label: string; y: number }): void;
	render(): void;
}
