interface Pack {
	id: string;
	name: string;
	description: string;
	logo: string | null;
	file: string | null;
}
export namespace Packs {
	export { DEFAULT_PACK };
	/** Returns [{ id, name, description, logo }] including the vanilla entry. */
	export function list(): Promise<Pack[]>;
	export function use(packId: string): Promise<Pack>;
	export const active: Pack;
	/** Returns an Image for the pack's texture, or null if it has none. */
	export function getImage(key: string): Promise<HTMLImageElement | null>;
	/** Returns an Image for an arbitrary path inside the pack zip. */
	export function getAsset(fullPath: string): Promise<HTMLImageElement | null>;
	/** Returns decoded UTF-8 text for a file inside the pack zip. */
	export function getText(fullPath: string): Promise<string | null>;
}
declare const DEFAULT_PACK: Pack;
export {};
