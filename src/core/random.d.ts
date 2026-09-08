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
