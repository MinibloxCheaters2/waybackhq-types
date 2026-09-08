import { EntityLivingBase } from "./entityliving.js";
import { DamageSourceType } from "./entity.js";
import { FoodStats } from "./foodstats.js";
import { EntityItem } from "./item.js";
import { ItemStack } from "../item/items.js";
import { KnockbackConfig } from "../core/knockback.js";
export class InventoryPlayer {
	mainInventory: (ItemStack | null)[];
	armorInventory: (ItemStack | null)[];
	currentItem: number;
	itemStack: ItemStack | null;
	getItemStack(): ItemStack | null;
	setItemStack(stack: ItemStack | null): void;
	getCurrentItem(): ItemStack | null;
	/** InventoryPlayer.getTotalArmorValue. */
	getTotalArmorValue(): number;
	setInventorySlotContents(slot: number, stack: ItemStack | null): void;
	clear(): void;
	consumeCurrentItem(): void;
	/** Finds the first slot holding an item with the given name/potion type. */
	findSlot(name: string, potionType?: number): number;
	countItem(name: string, potionType?: number): number;
	addItemStackToInventory(stack: ItemStack): boolean;
	/**
	 * Pulls the first matching stack out of the main inventory into the hotbar
	 * slot the player is holding, the way a server-side kit refill behaves.
	 */
	moveToHotbar(fromSlot: number, toSlot: number): void;
}
export class EntityPlayer extends EntityLivingBase {
	constructor(world: World, name: string);
	isPlayer: true;
	username: string;
	inventory: InventoryPlayer;
	foodStats: FoodStats;
	starveDamageSource: DamageSourceType;
	speedInAir: number;
	walkSpeed: number;
	itemInUse: ItemStack | null;
	itemInUseCount: number;
	itemUseFinished: boolean;
	cameraYaw: number;
	prevCameraYaw: number;
	cameraPitch: number;
	prevCameraPitch: number;
	xpCooldown: number;
	pearlCooldownTicks: number;
	score: number;
	deaths: number;
	kills: number;
	lastAttacker: Entity | null;
	spawnPoint: {
		x: number;
		y: number;
		z: number;
		yaw: number;
		pitch: number;
	};
	getAIMoveSpeed(): number;
	restoreVitals(): void;
	getLastActiveItems(): (ItemStack | null)[];
	getEnchantmentModifierDamage(source: DamageSourceType): number;
	getCurrentEquippedItem(): ItemStack | null;
	/**
	 * Port of the equipment sync in EntityLivingBase.onUpdate: the held item's
	 * attribute modifiers are applied to the attribute map. This is what makes
	 * a diamond sword deal 1.0 (player base) + 7.0 (weapon modifier).
	 */
	updateEquipmentAttributes(): void;
	_lastEquippedKey: string | null;
	isUsingItem(): boolean;
	isBlocking(): boolean;
	getItemInUseDuration(): number;
	setItemInUse(stack: ItemStack, duration: number): void;
	clearItemInUse(): void;
	stopUsingItem(): void;
	shouldHeal(): boolean;
	canEat(ignoreHunger: boolean): boolean;
	addExhaustion(amount: number): void;
	getFoodStats(): FoodStats;
	/** Port of EntityPlayer.addMovementStat, the source of walk exhaustion. */
	addMovementStat(dx: number, dy: number, dz: number): void;
	/** Port of EntityLivingBase.fall / EntityPlayer.fall. */
	fall(distance: number): void;
	playSoundEvent(): void;
	/** Teleport used by ender pearls; also cancels momentum like vanilla. */
	setPositionAndUpdate(x: number, y: number, z: number): void;
	dropOneItem(wholeStack: boolean): EntityItem | null;
	dropPlayerItem(stack: ItemStack, randomChoice?: boolean, traceOwner?: boolean): EntityItem | null;
	damageArmor(amount: number): void;
	/**
	 * Port of EntityPlayer.attackTargetEntityWithCurrentItem.
	 */
	attackTargetEntityWithCurrentItem(target: Entity): boolean;
	onCriticalHit(target: Entity): void;
	onEnchantmentCritical(target: Entity): void;
	onAttackLanded(target: Entity, critical: boolean): void;
	setLastAttacker(entity: Entity): void;
	updateItemUse(stack: ItemStack, count: number): void;
	/** Port of EntityPlayer.onItemUseFinish. */
	onItemUseFinish(): void;
	/** Applies one effect entry from a drunk potion at full strength. */
	applyPotionFromItem(
		effect: {
			id: number;
			duration: number;
			amplifier: number;
		},
		strength?: number,
		potionDef?: unknown,
	): void;
	onConsumeItem(stack: ItemStack, action: string): void;
}
import { World } from "../world/world.js";
