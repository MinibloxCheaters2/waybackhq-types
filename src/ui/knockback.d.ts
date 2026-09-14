import { MinecraftSlider } from "./widgets/slider.js";
import type { KnockbackConfig } from "../core/knockback.js";

export class KnockbackScreen {
	constructor(ui: import("./minecraft.js").MinecraftUI, game: import("../game/index.js").Game);
	ui: import("./minecraft.js").MinecraftUI;
	game: import("../game/index.js").Game;
	values: KnockbackConfig;
	sliders: MinecraftSlider[];
	open(values?: Partial<KnockbackConfig>): void;
	draw(): void;
	layout(): {
		x: number;
		y: number;
		w: number;
		rowHeight: number;
	};
	ensureSliders(layout: { x: number; y: number; w: number; rowHeight: number }): void;
	commit(field: string, value: number): void;
}
