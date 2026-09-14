/**
 * The single game and death screen instance the interface talks to.
 *
 * Keeping them here rather than in main.js means each panel imports what it
 * needs directly, so adding a panel does not mean editing a shared file.
 */
import { Game } from "../game/index.js";
import { DeathScreen } from "../client/deathscreen.js";

export const game: Game;
export const deathScreen: DeathScreen;
