export namespace LoadingScreen {
	function showLoading(): void;
	function setLoading(progress: number, label: string): void;
	function setError(text: string): void;
	function drawLoading(): void;
}
