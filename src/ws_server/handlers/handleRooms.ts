import { Game, Handler, IndexRoom, MESSAGE_TYPE, Room, User } from "../types";
import { generateId } from "../helpers/generateId";
import { roomsArray } from "../storages/roomsArray";
import { getUserByConnection } from "../helpers/getUserByConnection";
import { createMessageStringified } from "../helpers/message";
import { getUserConnectionByIndex } from "../helpers/getUserConnectionByIndex";
import { gameSessionsMap } from "../storages/gameSessionsMap";

const handleCreateRoom: Handler<string> = async (data, ws) => {
  const user = await getUserByConnection(ws);

  const room = createRoom();
  roomsArray.push(room);

  addUserToRoom(user, room);
};

const handleAddUserToRoom: Handler<IndexRoom> = async (data, ws) => {
  const room = roomsArray.find((room) => room.roomId === data.indexRoom);

  if (room === undefined) {
    throw new Error(`Room with index: ${data.indexRoom} not found`);
  }

  const user = await getUserByConnection(ws);

  addUserToRoom(user, room);

  const idGame = generateId();

  room.roomUsers.forEach(({ index }) => {
    const gameData = createGame(idGame, index);
    const message = createMessageStringified(
      MESSAGE_TYPE.CREATE_GAME,
      gameData,
    );
    ws = getUserConnectionByIndex(index);
    ws.send(message);
  });

  gameSessionsMap.set(idGame, []);
};

function createGame(idGame: number, playerId: number) {
  const messageData: Game = {
    idGame: idGame,
    idPlayer: playerId,
  };

  return messageData;
}

function createRoom(): Room {
  return {
    roomId: generateId(),
    roomUsers: [],
  };
}

function addUserToRoom(user: User, room: Room) {
  if (isUserInRoom(user, room)) return;

  room.roomUsers.push(user);
}

function isUserInRoom(user: User, room: Room) {
  return Boolean(room.roomUsers.find((u) => u.index === user.index));
}

export { handleCreateRoom, createRoom, handleAddUserToRoom };
