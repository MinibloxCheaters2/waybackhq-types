import type { ClientPlayer } from "../client/clientplayer.js";
import type { NetworkPlayer } from "../net/netplayer.js";
import type { EntityPlayer } from "../entity/player.js";

export const RESPAWN_TICKS: 40;
export const COUNTDOWN_TICKS: 60;
export namespace MatchMethods {
	function startMatch(
		arenaId?: string,
		options?: {
			name?: string;
			opponentName?: string;
			difficulty?: number;
			winScore?: number;
		},
	): void;
	function beginNetworkMatch(options: {
		role: "client" | "host";
		autoClicker?: boolean;
		serverData?: Record<string, unknown>;
		worldFactory?: () => import("../world/world.js").World;
		arenaId?: string;
		localName: string;
		localRole?: string;
		localEntityId: string | number;
		spawn?: { x: number; y: number; z: number; yaw: number; pitch: number };
		players: Array<{ id: string | number; name: string }>;
		matchState?: string;
		countdown?: number;
	}): Promise<void>;
	function addNetworkPlayer(
		entityId: string | number,
		name: string,
		ghost?: boolean,
	): NetworkPlayer;
	function endNetworkMatch(): void;
	function removeNetworkPlayer(entityId: string | number): void;
	function resetPlayer(player: ClientPlayer): void;
	function endMatch(winner: EntityPlayer): void;
	function respawnLocalPlayer(): void;
	function triggerDeathEffect(x: number, y: number, z: number, localDeath?: boolean): void;
	function handleDeaths(): void;
}
