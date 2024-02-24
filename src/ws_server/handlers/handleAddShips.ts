import { PlayerBoard, Handler, GameStart, MESSAGE_TYPE } from "../types";
import { gameSessionsMap } from "../storages/gameSessionsMap";
import { getUserConnectionByIndex } from "../helpers/getUserConnectionByIndex";
import { createMessageStringified } from "../helpers/message";

const handleAddShips: Handler<PlayerBoard> = (data) => {
  const { gameId } = data;

  const gameSession = gameSessionsMap.get(gameId);

  gameSession.push(data);

  if (gameSession.length === 2) {
    startGame(gameId);
  }
};

function startGame(gameId: number) {
  const gameSession = gameSessionsMap.get(gameId);
  const playersId = gameSession.map((board) => board.indexPlayer);
  const playersConnections = playersId.map((id) =>
    getUserConnectionByIndex(id),
  );

  playersId.forEach((id, index) => {
    const playerBoard = gameSession.find(
      (session) => session.indexPlayer === id,
    );
    const messageData: GameStart = {
      ships: playerBoard.ships,
      currentPlayerIndex: playerBoard.indexPlayer,
    };
    const message = createMessageStringified(
      MESSAGE_TYPE.CREATE_GAME,
      messageData,
    );
    playersConnections[index].send(message);
  });
}

export { handleAddShips };
