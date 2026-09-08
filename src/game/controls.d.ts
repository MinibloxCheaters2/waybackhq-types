export namespace ControlMethods {
	function setupInput(): void;
	/**
	 * Opening a container releases the mouse but the world keeps ticking, as
	 * it does in vanilla multiplayer. Standing in your inventory is not safe.
	 */
	function openInventory(): void;
	function releaseItemUse(): void;
	function closeInventory(): void;
	function togglePause(): void;
	function updateLocalInput(): void;
	function setHotbarSlot(slot: number): void;
	/** Mouse look is applied per frame, as EntityRenderer does in 1.7.10. */
	function applyMouseLook(apply?: boolean): void;
}
