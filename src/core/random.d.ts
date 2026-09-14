/**
 * Port of java.util.Random, including the exact linear congruential generator
 * and the Marsaglia polar method used by nextGaussian. Projectile spread in
 * Minecraft is driven by nextGaussian, so matching the generator matters when
 * replaying or verifying trajectories.
 *
 * BigInt is avoided in the hot path by splitting the 48 bit state into two
 * 24 bit halves and multiplying with regular doubles.
 */
export class JavaRandom {
	constructor(seed?: number);
	setSeed(seed: number): void;
	lo: number;
	hi: number;
	haveNextNextGaussian: boolean;
	nextNextGaussian: number;
	/** Advances the 48 bit LCG and returns the top `bits` bits. */
	next(bits: number): number;
	nextInt(bound?: number): number;
	nextFloat(): number;
	nextDouble(): number;
	nextBoolean(): boolean;
	nextGaussian(): number;
}
/** Shared instance used wherever vanilla uses Entity.rand. */
export const rand: JavaRandom;
