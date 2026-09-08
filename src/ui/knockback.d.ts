import { MinecraftSlider } from "./widgets/slider.js";

export class KnockbackScreen {
	constructor(ui: import("./minecraft.js").MinecraftUI, game: import("../game/index.js").Game);
	ui: import("./minecraft.js").MinecraftUI;
	game: import("../game/index.js").Game;
	values: {
		horizontal: number;
		vertical: number;
	};
	sliders: MinecraftSlider[];
	open(values: Partial<{ horizontal: number; vertical: number }>): void;
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
