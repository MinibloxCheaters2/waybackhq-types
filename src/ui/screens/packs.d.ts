export namespace PacksScreen {
	function loadPacks(): Promise<void>;
	function drawPacks(): void;
	function packLogo(pack: {
		id: string;
		name: string;
		description: string;
		logo: string | null;
		file: string | null;
		_image?: HTMLImageElement;
	}): HTMLImageElement;
}
