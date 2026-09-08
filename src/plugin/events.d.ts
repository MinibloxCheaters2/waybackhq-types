export const GAME_EVENTS: Readonly<{
	NETWORK_START: "network:start";
	NETWORK_END: "network:end";
	RENDER_FRAME: "render:frame";
	SCREEN_CLOSE: "screen:close";
	SCREEN_DRAW: "screen:draw";
	INVENTORY_OPEN: "inventory:open";
	ITEM_RIGHT_CLICK: "item:right-click";
	ITEM_USE_START: "item:use-start";
	ITEM_FINISH: "item:finish";
	ITEM_PREDICT_FINISH: "item:predict-finish";
	SESSION_CREATE: "session:create";
}>;
export const SESSION_EVENTS: Readonly<{
	PACKET: "packet";
	EVENT: "event";
}>;
export const INPUT_EVENTS: Readonly<{
	KEY_DOWN: "keydown";
	KEY_UP: "keyup";
	POINTER_LOCK: "pointerlock";
}>;
export const CONNECTION_EVENTS: Readonly<{
	PACKET: "packet";
	CLOSE: "close";
}>;
export const SERVER_EVENTS: Readonly<{
	PACKET: "packet";
}>;
export const INSTANCE_EVENTS: Readonly<{
	PACKET: "packet";
	ACTIONS_PROCESS: "actions:process";
	ITEM_RIGHT_CLICK: "item:right-click";
	ITEM_FINISH: "item:finish";
	PLAYER_DEATH: "playerDeath";
	PLAYER_LEAVE: "playerLeave";
}>;
