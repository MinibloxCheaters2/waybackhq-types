/**
 * Port of net.minecraft.util.FoodStats.
 *
 * Exhaustion above 4.0 drains one saturation point, or one hunger point when
 * saturation is empty. Natural regeneration heals 1 HP every 80 ticks while
 * hunger is 18 or above, costing 3 exhaustion.
 */
export class FoodStats {
	foodLevel: number;
	foodSaturationLevel: number;
	foodExhaustionLevel: number;
	foodTimer: number;
	prevFoodLevel: number;
	addStats(hunger: number, saturationModifier: number): void;
	onUpdate(player: EntityPlayer): void;
	addExhaustion(amount: number): void;
	needFood(): boolean;
	getFoodLevel(): number;
	getSaturationLevel(): number;
}
import { EntityPlayer } from "./player.js";
