import { Entity } from "./entity.js";
import { ItemStack } from "../item/items.js";
export class EntityItem extends Entity {
	constructor(world: World, x: number, y: number, z: number, stack: ItemStack);
	stack: ItemStack;
	age: number;
	delayBeforeCanPickup: number;
	lifetimeTicks: number | null;
	hoverStart: number;
	canTriggerWalking(): boolean;
	onUpdate(): void;
	tryPickup(): void;
	getSpin(partialTicks: number): number;
	getBob(partialTicks: number): number;
}
import { World } from "../world/world.js";
