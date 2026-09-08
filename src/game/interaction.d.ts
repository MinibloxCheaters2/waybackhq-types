import type { Entity } from "../entity/entity.js";
import type { Vec3 } from "../core/aabb.js";
import type { ClientPlayer } from "../client/clientplayer.js";
import type { ItemStack } from "../item/items.js";

/** Result of a mouse-over ray trace. Exactly one property is set. */
export type MouseOverResult =
	| { entity: Entity; block?: undefined; miss?: undefined }
	| {
			block: { blockX: number; blockY: number; blockZ: number; hitVec: Vec3; sideHit: number };
			entity?: undefined;
			miss?: undefined;
	  }
	| { miss: Vec3; entity?: undefined; block?: undefined };

/** Practice server pearl cooldown, 16 seconds. */
export const PEARL_COOLDOWN_TICKS: 320;
export namespace InteractionMethods {
	/** Port of Minecraft.func_147116_af, the left click. */
	function clickMouse(): void;
	/**
	 * Port of PlayerControllerMP.windowClick: applied locally to predict the
	 * result, then sent so the server runs the identical call on its own copy.
	 * The cursor stack lives on the acting player's inventory, so two players
	 * never share one.
	 */
	function windowClick(
		player: ClientPlayer,
		slotId: number,
		button: number,
		mode: number,
	): ItemStack | null;
	/**
	 * Port of Minecraft.rightClickMouse for the items in the kit.
	 *
	 * PlayerControllerMP.sendUseItem runs useItemRightClick on the client and
	 * then sends the packet, and the server runs the same call through
	 * tryUseItem, so both sides start the use.
	 */
	function rightClickMouse(player?: ClientPlayer): void;
	function throwPearl(player: ClientPlayer): void;
	function throwSplashPotion(player: ClientPlayer, stack: ItemStack): void;
	/** Port of EntityRenderer.getMouseOver. */
	function getMouseOver(partialTicks: number): MouseOverResult | null;
}
