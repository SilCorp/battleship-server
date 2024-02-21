import { WebSocket } from "ws";

type PlayersMap = WeakMap<WebSocket, number>;
const playersMap: PlayersMap = new WeakMap();

export { PlayersMap, playersMap };
