export namespace ShareScreen {
	function receiveCreatedShareToken(token: string): void;
	function toggleCreatedShare(): void;
	function copyCreatedShare(): Promise<void>;
	function continueCreatedShare(): void;
	function drawShareCreated(): void;
	function shareField(value: string, x: number, y: number): void;
}
