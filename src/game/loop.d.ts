export const TICK_RATE: 20;
export const MS_PER_TICK: number;
export namespace LoopMethods {
	function scheduleFrame(): void;
	function scheduleClock(): void;
	function clockLoop(now?: number): void;
	function shouldSimulate(): boolean;
	/** Advances the fixed clock. Shared by the render loop and the background clock. */
	function advanceSimulation(now: number, systemTime?: number): void;
	function loop(): void;
	function trackFps(now: number): void;
	/** One 20 Hz simulation step. */
	function runTick(): void;
	function updateEquippedProgress(): void;
}
