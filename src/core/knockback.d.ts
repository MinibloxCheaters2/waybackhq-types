export interface KnockbackConfig {
	horizontal: number;
	vertical: number;
}
export function setKnockbackConfig(
	config: Partial<KnockbackConfig>,
	target?: KnockbackConfig,
): KnockbackConfig;
export function createKnockbackConfig(config?: Partial<KnockbackConfig>): KnockbackConfig;
export function resetKnockbackConfig(target?: KnockbackConfig): KnockbackConfig;
export function setKnockbackValue(
	target: KnockbackConfig,
	key: "horizontal" | "vertical",
	value: number,
): boolean;
export function loadKnockback(): Promise<void>;
export const KNOCKBACK_FIELDS: readonly string[];
export const KNOCKBACK_RANGES: Readonly<{
	horizontal: number[];
	vertical: number[];
}>;
export const knockback: KnockbackConfig;
