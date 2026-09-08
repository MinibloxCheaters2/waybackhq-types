export namespace RenderMethods {
	function renderFrame(partialTicks: number): void;
	function updateFirstPersonItem(partialTicks: number): void;
	function renderHud(): void;
	function getDebugInfo(): Record<string, string | number | boolean>;
}
