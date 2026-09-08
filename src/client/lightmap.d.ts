import { EntityPlayer } from "../entity/player.js";
export class Lightmap {
	constructor();
	texture: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	ambientBrightness: number[];
	update(player: EntityPlayer | null, world: unknown): void;
}
