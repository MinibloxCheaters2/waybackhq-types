export function sin(v: number): number;
export function cos(v: number): number;
export function sqrt(v: number): number;
export function floor(v: number): number;
/** Java's (int) cast: truncation toward zero, not Math.floor. */
export function toInt(v: number): number;
export function ceil(v: number): number;
export function abs(v: number): number;
export function absMax(a: number, b: number): number;
export function clamp(v: number, lo: number, hi: number): number;
export function wrapAngleTo180(v: number): number;
export const PI: number;
export const DEG_2_RAD: number;
