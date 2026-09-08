export namespace LinkScreen {
	function openLinkConfirmation(url: string): void;
	function copyConfirmationLink(): Promise<void>;
	function confirmLinkOpen(): void;
	function closeLinkConfirmation(): void;
	function drawLinkConfirmation(): void;
	function drawCenteredLines(lines: string[], y: number, color: string, lineHeight: number): number;
	function wrapText(text: string, maxWidth: number): string[];
}
