/**
 * Ports of net.minecraft.util.Vec3 and net.minecraft.util.AxisAlignedBB.
 *
 * The offset calculations and ray intercept are reproduced literally because
 * Minecraft's collision response (including the order X/Y/Z are resolved and
 * the exact `<=` / `>=` comparisons) is what produces its characteristic
 * behaviour at block edges and corners.
 */
export class Vec3 {
	constructor(x?: number, y?: number, z?: number);
	x: number;
	y: number;
	z: number;
	set(x: number, y: number, z: number): this;
	copy(o: Vec3): this;
	clone(): Vec3;
	addVector(x: number, y: number, z: number): Vec3;
	squareDistanceTo(o: Vec3): number;
	distanceTo(o: Vec3): number;
	lengthVector(): number;
	/** Point on the segment this->o where x equals the given value, or null. */
	getIntermediateWithXValue(o: Vec3, x: number): Vec3 | null;
	getIntermediateWithYValue(o: Vec3, y: number): Vec3 | null;
	getIntermediateWithZValue(o: Vec3, z: number): Vec3 | null;
}
export class AABB {
	constructor(
		minX?: number,
		minY?: number,
		minZ?: number,
		maxX?: number,
		maxY?: number,
		maxZ?: number,
	);
	minX: number;
	minY: number;
	minZ: number;
	maxX: number;
	maxY: number;
	maxZ: number;
	setBounds(
		minX: number,
		minY: number,
		minZ: number,
		maxX: number,
		maxY: number,
		maxZ: number,
	): this;
	setBB(o: AABB): this;
	copy(): AABB;
	offset(x: number, y: number, z: number): this;
	getOffsetBoundingBox(x: number, y: number, z: number): AABB;
	/** Grows the box in the direction of travel, as used before collision sweeps. */
	addCoord(x: number, y: number, z: number): AABB;
	expand(x: number, y: number, z: number): AABB;
	contract(x: number, y: number, z: number): AABB;
	union(o: AABB): AABB;
	calculateXOffset(other: AABB, offset: number): number;
	calculateYOffset(other: AABB, offset: number): number;
	calculateZOffset(other: AABB, offset: number): number;
	intersectsWith(o: AABB): boolean;
	isVecInside(v: Vec3): boolean;
	isVecInYZ(v: Vec3 | null): boolean;
	isVecInXZ(v: Vec3 | null): boolean;
	isVecInXY(v: Vec3 | null): boolean;
	/**
	 * Ray/box intercept returning the nearest entry point and the face index,
	 * matching AxisAlignedBB.calculateIntercept.
	 */
	calculateIntercept(
		start: Vec3,
		end: Vec3,
	): {
		hitVec: Vec3;
		sideHit: number;
	} | null;
}
