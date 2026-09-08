/**
 * Port of the attribute system (ModifiableAttributeInstance.computeValue).
 * Operation 0 adds, operation 1 adds a fraction of the operation-0 total, and
 * operation 2 multiplies. Sprinting and the speed potion both use operation 2,
 * which is why their bonuses multiply rather than add.
 */
export class AttributeInstance {
	constructor(baseValue: number, min?: number, max?: number);
	baseValue: number;
	min: number;
	max: number;
	modifiers: Map<string, number>[];
	dirty: boolean;
	cached: number;
	setBaseValue(value: number): void;
	getBaseValue(): number;
	applyModifier(uuid: string, amount: number, operation: number): void;
	removeModifier(uuid: string): void;
	hasModifier(uuid: string): boolean;
	getAttributeValue(): number;
}
export const SPRINTING_MODIFIER_UUID: "662a6b8d-da3e-4c1c-8813-96ea6097278d";
export const SPRINTING_MODIFIER_AMOUNT: 0.30000001192092896;
