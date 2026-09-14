import * as THREE from "three";

/** Creates one glint overlay pass sharing the geometry and glint material. */
export function makeGlintMesh(
	geometry: THREE.BufferGeometry,
	mode: "item" | "armor",
	pass: number,
): THREE.Mesh;
/** Animates a glint mesh. Items use system ms, armour uses entity age ticks. */
export function updateGlint(mesh: THREE.Mesh, timeMs: number, ageTicks: number): void;
/**
 * Draws the animated glint over a 16x16 item icon using the same two-pass
 * scroll as the 3D item glint, with the vanilla SRC_COLOR / ONE result
 * (out = src^2 + dst) applied per pixel.
 */
export function drawItemGlint(
	ctx: CanvasRenderingContext2D,
	icon: HTMLImageElement | HTMLCanvasElement,
	x: number,
	y: number,
	timeMs: number,
	size?: number,
): void;
/** Whether a stack renders the enchantment glint in the GUI. */
export function shouldGlint(stack: { hasEffect(): boolean; potionType?: unknown } | null): boolean;
