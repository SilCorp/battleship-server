import { PlayerBoard } from "../types";

type GameSessionsMap = Map<number, PlayerBoard[]>;
const gameSessionsMap: GameSessionsMap = new Map();

export { GameSessionsMap, gameSessionsMap };
