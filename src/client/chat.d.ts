export class ChatController {
	constructor(game: Game);
	game: Game;
	screenCloser: () => void;
	active: boolean;
	history: string[];
	historyIndex: number;
	draftBeforeHistory: string;
	input: HTMLInputElement;
	openChat(initial?: string): void;
	ensureFocus(): void;
	closeChat(): void;
	handleKey(event: KeyboardEvent): void;
	navigateHistory(direction: number): void;
	submit(): void;
	receive(message: string): void;
	invalidate(): void;
}
declare class Game {
	currentScreen: string | null;
	paused: boolean;
	localPlayer: { username: string } | null;
	matchState: string;
	session: { sendChat(message: string): void } | null;
	netRole: string;
	hud: { chatScroll: number; addChatMessage(message: string): void; lastSignature: string };
	input: { suppressLock: boolean; clear(): void; exitLock(): void; requestLock(): void };
	setCurrentScreen(screen: string | null, closer?: () => void): void;
}
