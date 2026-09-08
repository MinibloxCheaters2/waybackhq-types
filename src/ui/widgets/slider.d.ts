export class MinecraftSlider {
	constructor(
		ui: import("../minecraft.js").MinecraftUI,
		id: string,
		x: number,
		y: number,
		label: string,
		min: number,
		max: number,
		value: number,
		onChange: ((value: number) => void) | null,
		onRelease: ((value: number, startValue: number) => void) | null,
		format?: (number: number) => string,
		visible?: () => boolean,
		width?: number,
		height?: number,
	);
	ui: import("../minecraft.js").MinecraftUI;
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	label: string;
	min: number;
	max: number;
	onChange: ((value: number) => void) | null;
	onRelease: ((value: number, startValue: number) => void) | null;
	format: (number: number) => string;
	visible: () => boolean;
	isMouseDown: boolean;
	hovered: boolean;
	dragStartValue: number;
	sliderPosition: number;
	bindEvents(): void;
	setLayout(x: number, y: number): void;
	getValue(): number;
	setValue(value: number, notify: boolean): void;
	setPosition(x: number): void;
	contains(x: number, y: number): boolean;
	mousePressed(x: number, y: number): boolean;
	mouseDragged(x: number): void;
	mouseReleased(): void;
	release(): void;
	cancel(): void;
	draw(ui?: import("../minecraft.js").MinecraftUI): void;
}
