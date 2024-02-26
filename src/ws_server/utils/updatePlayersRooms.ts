import { Clients, MESSAGE_TYPE } from "../types";
import { createMessageStringified } from "../helpers/message";
import { roomsArray } from "../storages/roomsArray";
import { logResponse } from "../helpers/logger";
import { WebSocket } from "ws";

function updatePlayersRooms(clients: WebSocket | Clients) {
  if (clients instanceof WebSocket) {
    const message = createMessageStringified(
      MESSAGE_TYPE.UPDATE_ROOM,
      roomsArray,
    );

    clients.send(message);

    logResponse(message);
    return;
  }

  const roomsWithOnePlayer = roomsArray.filter(
    (room) => room.roomUsers.length === 1,
  );
  const message = createMessageStringified(
    MESSAGE_TYPE.UPDATE_ROOM,
    roomsWithOnePlayer,
  );

  clients.forEach((client) => {
    client.send(message);
  });

  logResponse(message);
}

export { updatePlayersRooms };
