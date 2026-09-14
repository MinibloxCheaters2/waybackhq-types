import { PACKET } from "./protocol.js";
import { CONNECTION_EVENTS } from "../plugin/events.js";

export function apiUrl(path: string): string;
export class Connection {
	socket: WebSocket | null;
	connected: boolean;
	latency: number;
	listeners: Record<string, Array<(payload: unknown) => void>>;
	pingTimer: ReturnType<typeof setInterval> | null;
	lastPacketAt: number;
	openGeneration: number;
	cancelOpen: (() => void) | null;
	on(event: string, handler: (payload: unknown) => void): this;
	emit(event: string, payload: unknown): void;
	open(endpoint?: string): Promise<void>;
	handleMessage(raw: string): void;
	handleClose(): void;
	startPinging(): void;
	stopPinging(): void;
	sendReliable(packet: unknown[]): void;
	sendFast(packet: unknown[]): void;
	close(): void;
}
