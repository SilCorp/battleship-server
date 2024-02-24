import { WebSocket } from "ws";

type PlayersMap = Map<WebSocket, number>;
const playersMap: PlayersMap = new Map();

export { PlayersMap, playersMap };
