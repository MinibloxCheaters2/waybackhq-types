export namespace OptionsScreen {
	function optionLabel(key: string, label: string): string;
	function cycleOption(def: [string, string, [number, number, number] | undefined]): void;
	function drawOptions(): void;
	function ensureOptionSlider(
		key: string,
		label: string,
		range: [number, number, number],
		x: number,
		y: number,
	): void;
	function getSliderValue(key: string, range: [number, number, number]): number;
	function setSliderValue(key: string, value: number): void;
	function applySettings(): void;
	function saveSettings(): void;
}
