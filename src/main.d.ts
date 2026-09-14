import type { GameExtension } from "./game/game.js";

export function boot(
	extensionLoader?:
		| ((data: Record<string, unknown>) => GameExtension | null | Promise<GameExtension | null>)
		| null,
): Promise<void>;
