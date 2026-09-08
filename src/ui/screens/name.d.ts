export namespace NameScreen {
	function openNameScreen(returnScreen: string): void;
	function needsMultiplayerNamePrompt(): boolean;
	function openMultiplayerNamePrompt(continueAction: () => void): void;
	function drawName(): void;
	function finishNameEdit(): void;
	function cancelNameEdit(): void;
}
