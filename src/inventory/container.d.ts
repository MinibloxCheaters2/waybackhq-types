import type { ItemStack } from "../item/items.js";
import type { EntityPlayer } from "../entity/player.js";
/** Port of Container.func_94534_d / func_94532_c / func_94529_b. */
export function dragButton(phase: number, mode: number): number;
/** Slot indices: 0-8 hotbar, 9-35 main, 36-39 armour (boots first). */
export function getSlot(player: EntityPlayer, index: number): ItemStack | null;
export function setSlot(player: EntityPlayer, index: number, stack: ItemStack | null): void;
/** Port of SlotArmor.isItemValid. */
export function isItemValid(index: number, stack: ItemStack | null): boolean;
/**
 * Port of Container.slotClick for the modes the player inventory uses.
 * Returns the stack the click produced, which the server compares against
 * what the client claimed before accepting it.
 */
export function slotClick(
	player: EntityPlayer,
	index: number,
	button: number,
	mode: number,
): ItemStack | null;
/**
 * Port of the parts of net.minecraft.inventory.Container that a player
 * inventory needs.
 *
 * slotClick is deliberately a free function taking the acting player rather
 * than a method on the screen: the client runs it to predict the result and
 * the server runs the identical call on its own copy, then compares. That is
 * how ContainerPlayer behaves, and it is why the cursor stack lives on
 * InventoryPlayer rather than on the interface.
 *
 * Click modes follow the vanilla numbering:
 *   0  normal click, button 0 whole stack and 1 half
 *   1  shift click, move between hotbar and main inventory
 *   2  number key, swap the slot with a hotbar slot
 *   4  drop, button 0 one item and 1 the whole stack
 *   5  drag distribute, a three phase state machine
 *   6  double click, collect every matching stack onto the cursor
 *
 * Mode 3, the creative clone, is deliberately absent: Container.slotClick gates
 * it on capabilities.isCreativeMode, which nothing here ever sets.
 *
 * Dropping discards the stack. Vanilla hands it to
 * dropPlayerItemWithRandomChoice, and there are no item entities here for it to
 * become, so a dropped stack is gone.
 */
export const MODE_CLICK: 0;
export const MODE_SHIFT: 1;
export const MODE_HOTBAR: 2;
export const MODE_DROP: 4;
export const MODE_DRAG: 5;
export const MODE_DOUBLE: 6;
/** Slot index Container uses for "outside the window". */
export const SLOT_OUTSIDE: -999;
