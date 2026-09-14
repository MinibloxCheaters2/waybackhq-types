import * as THREE from "three";

/**
 * Port of WorldProvider.calculateCelestialAngle.
 */
export function calculateCelestialAngle(worldTime: number, partialTicks: number): number;
/**
 * Port of World.getSunBrightness. Rain and thunder are always zero here, so
 * only the celestial angle drives it.
 *
 * Arenas store a wall clock minute where 720 is midday, while Minecraft's
 * worldTime starts at dawn, so the two are six hours apart. Rotating by 1080
 * rather than subtracting 360 keeps the value positive, which matters because
 * a negative remainder would survive calculateCelestialAngle's single wrap.
 */
export function getSunBrightness(timeMinutes: number): number;
/**
 * The lightmap coordinate a packed brightness samples at.
 *
 * enableLightmap scales the texture matrix by 1/256 and shifts it by 8, so the
 * low half of the packed value lands on the centre of the block column and the
 * high half on the centre of the sky row.
 */
export function lightmapUV(packed: number, out: THREE.Vector2): THREE.Vector2;
/** GLSL shared by every material that samples the lightmap. */
export const LIGHTMAP_DECLARE = "uniform sampler2D uLightmap;";
export const LIGHTMAP_APPLY = "gl_FragColor.rgb *= texture2D(uLightmap, vLight).rgb;";

export class Lightmap {
	colors: Uint8Array;
	texture: THREE.DataTexture;
	torchFlickerX: number;
	torchFlickerDX: number;
	torchFlickerY: number;
	torchFlickerDY: number;
	uniform: { value: THREE.DataTexture };
	lastInputs: { sun: number; flicker: number; nightVision: number; gamma: number } | null;
	constructor();
	/**
	 * Port of EntityRenderer.updateTorchFlicker. Only entries with block light
	 * above zero move with it, so an arena with no emitting blocks can leave it
	 * alone entirely.
	 *
	 * Math.random rather than the shared world Random, as the original has it:
	 * this is cosmetic, and drawing from the simulation stream would make the
	 * host and a guest diverge.
	 */
	updateTorchFlicker(): void;
	/**
	 * Port of EntityRenderer.updateLightmap. gamma is Minecraft's Brightness
	 * slider, which defaults to zero and has no control here yet; the term is
	 * kept so wiring one up later needs nothing from this file.
	 *
	 * Returns true when the texture was re-uploaded.
	 */
	update(sun: number, nightVision: number, gamma?: number): boolean;
	/**
	 * Patches a material so its fragments are multiplied by the lightmap.
	 *
	 * Terrain carries a light coordinate per vertex because smooth lighting
	 * gives every corner its own; everything else is a whole object at one
	 * point in the world and passes a single uniform, which is the split
	 * vanilla makes between Tessellator.setBrightness and
	 * OpenGlHelper.setLightmapTextureCoords.
	 */
	attach(material: THREE.Material, perVertex: boolean): THREE.Material;
}
