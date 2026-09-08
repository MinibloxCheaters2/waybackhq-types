export class GameTimer {
	constructor(ticksPerSecond: number);
	ticksPerSecond: number;
	lastHRTime: number;
	elapsedTicks: number;
	renderPartialTicks: number;
	timerSpeed: number;
	elapsedPartialTicks: number;
	lastSyncSysClock: number;
	lastSyncHRClock: number;
	accumulatedSysTime: number;
	timeSyncAdjustment: number;
	reset(): void;
	updateTimer(now?: number, systemTime?: number): void;
}
