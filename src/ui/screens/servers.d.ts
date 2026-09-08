import { Session } from "../../net/session.js";

interface ServerInfo {
	id: string | number;
	name: string;
	label: string;
	arenaName: string;
	kind: string;
	players: number;
	maxPlayers: number;
	ping: number;
	private: boolean;
	duels: number;
	playerNames: string[];
}

export namespace ServerScreen {
	function openMultiplayerScreen(): void;
	function refreshServers(): Promise<void>;
	function drawServers(): void;
	function isPingHover(x: number, y: number): boolean;
	function drawServerTooltip(lines: string[]): void;
	function drawPingBars(x: number, y: number, ping: number): void;
	function newSession(): Session;
	function createServer(): Promise<void>;
	function drawPrivateLabel(right: number, y: number): void;
	function joinServer(server: ServerInfo, shareToken?: string): Promise<void>;
	function joinShareLink(): Promise<void>;
	function teardownSession(): void;
}
