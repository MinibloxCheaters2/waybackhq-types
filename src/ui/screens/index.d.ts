import type { ServerInfo } from "./servers.js";

export const ScreenMethods: {
	showLoading(): void;
	setLoading(progress: number, label: string): void;
	setError(text: string): void;
	drawLoading(): void;
	drawWaybackLogo(y: number): void;
	drawMain(): void;
	drawSolo(): void;
	startSolo(): void;
	drawMultiplayer(): void;
	openMultiplayerScreen(): void;
	refreshServers(): Promise<void>;
	drawServers(): void;
	isPingHover(x: number, y: number): boolean;
	drawServerTooltip(lines: string[]): void;
	drawPingBars(x: number, y: number, ping: number): void;
	newSession(): import("../../net/session.js").Session;
	createServer(): Promise<void>;
	drawPrivateLabel(right: number, y: number): void;
	joinServer(server: ServerInfo | undefined, shareToken?: string): Promise<void>;
	joinShareLink(): Promise<void>;
	teardownSession(): void;
	optionLabel(key: string, label: string): string;
	cycleOption(def: [string, string, [number, number, number] | undefined]): void;
	drawOptions(): void;
	ensureOptionSlider(
		key: string,
		label: string,
		range: [number, number, number],
		x: number,
		y: number,
	): void;
	getSliderValue(key: string, range: [number, number, number]): number;
	setSliderValue(key: string, value: number): void;
	applySettings(): void;
	saveSettings(): void;
	drawSounds(): void;
	drawControls(): void;
	loadPacks(): Promise<void>;
	drawPacks(): void;
	packLogo(pack: {
		id: string;
		name: string;
		description: string;
		logo: string | null;
		file: string | null;
		_image?: HTMLImageElement;
	}): HTMLImageElement;
	drawReloading(): void;
	drawPause(): void;
	drawResult(): void;
	leaveMatch(): void;
	openNameScreen(returnScreen: string): void;
	needsMultiplayerNamePrompt(): boolean;
	openMultiplayerNamePrompt(continueAction: () => void): void;
	drawName(): void;
	finishNameEdit(): void;
	cancelNameEdit(): void;
	receiveCreatedShareToken(token: string): void;
	toggleCreatedShare(): void;
	copyCreatedShare(): Promise<void>;
	continueCreatedShare(): void;
	drawShareCreated(): void;
	shareField(value: string, x: number, y: number): void;
	openLinkConfirmation(url: string): void;
	copyConfirmationLink(): Promise<void>;
	confirmLinkOpen(): void;
	closeLinkConfirmation(): void;
	drawLinkConfirmation(): void;
	drawCenteredLines(lines: string[], y: number, color: string, lineHeight: number): number;
	wrapText(text: string, maxWidth: number): string[];
	drawDisconnect(): void;
	drawDisconnectReason(reason: string, centerX: number, startY: number): void;
};
