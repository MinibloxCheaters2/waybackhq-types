import * as THREE from "three";
import { ItemStack } from "../item/items.js";
export {};

export const Assets: AssetStore;
declare class AssetStore {
	itemImages: Map<string, HTMLCanvasElement>;
	itemTextures: Map<string, THREE.Texture>;
	sounds: Map<string, AudioBuffer>;
	atlasTiles: number;
	ready: boolean;
	skinCache: Map<string, Promise<THREE.Texture>>;
	singleChestImage: HTMLCanvasElement | null;
	load(onProgress?: (progress: number, phase: string) => void): Promise<void>;
	skinImage: HTMLCanvasElement;
	skinTexture: THREE.Texture;
	armorLayer1: THREE.Texture;
	armorLayer2: THREE.Texture;
	iconsImage: HTMLImageElement;
	iconsScale: number;
	widgetsImage: HTMLImageElement;
	widgetsScale: number;
	fontImage: HTMLImageElement;
	particlesTexture: THREE.Texture;
	particlesImage: HTMLImageElement;
	cloudsImage: HTMLImageElement;
	sunTexture: THREE.Texture;
	moonTexture: THREE.Texture;
	glintTexture: THREE.Texture;
	glintImage: HTMLImageElement;
	optionsBackgroundImage: HTMLImageElement;
	inventoryImage: HTMLImageElement;
	inventoryScale: number;
	chestImage: HTMLImageElement;
	fireImages: HTMLImageElement[];
	fontWidths: Uint8Array;
	blockTextures: Map<string, THREE.Texture>;
	loadItemTextures(names: string[]): Promise<void>;
	/**
	 * Packs every block texture into one atlas.
	 *
	 * Frame 0 is taken from animated strips, biome tints are baked in and the
	 * grass side overlay is composited, so no shader work is needed later.
	 * Mipmaps are generated per texture (vanilla 1.7.10 defaults to 4 levels),
	 * which is what removes the shimmering noise on distant floors.
	 */
	buildBlockTextures(names: string[], images: HTMLImageElement[]): void;
	buildItemIcons(names: string[], images: HTMLImageElement[]): void;
	getPlayerSkin(name: string): Promise<THREE.Texture>;
	/**
	 * Port of FontRenderer.readFontTexture: the advance for each glyph is the
	 * rightmost opaque column plus one.
	 */
	computeFontWidths(fontImage: HTMLImageElement): Uint8Array;
	getItemIcon(stack: ItemStack | null): HTMLCanvasElement | null;
	getItemTexture(stack: ItemStack | null): THREE.Texture | null;
	getBlockTexture(name: string): THREE.Texture | undefined;
}
export function nearestTexture(source: HTMLImageElement | HTMLCanvasElement): THREE.Texture;
export const ROOT: "assets/minecraft/textures/";
