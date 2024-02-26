import { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { MESSAGE_TYPE, PlayerBoard } from "./types";
import { parseEntireMessage } from "./helpers/message";
import { isCredentials } from "./guards/isCredentials";
import { logRequest } from "./helpers/logger";
import { handleUser } from "./handlers/handleUser";
import { handleAddUserToRoom, handleCreateRoom } from "./handlers/handleRooms";
import { updatePlayersRooms } from "./utils/updatePlayersRooms";
import { isIndexRoom } from "./guards/isIndexRoom";
import { handleAddShips } from "./handlers/handleAddShips";

export const wsServer = createServer();

const wss = new WebSocketServer({ server: wsServer, clientTracking: true });

wss.on("connection", (ws) => {
  ws.on("message", (request) => logRequest(request));
  ws.on("message", async (rawMessage) => {
    const parsedMessage = parseEntireMessage(rawMessage.toString());
    const { type, data } = parsedMessage;

    if (type === MESSAGE_TYPE.REG && isCredentials(data)) {
      await handleUser(data, ws, wss.clients);
      updatePlayersRooms(ws);
      return;
    }

    if (type === MESSAGE_TYPE.CREATE_ROOM && data === "") {
      await handleCreateRoom(data, ws, wss.clients);
      updatePlayersRooms(wss.clients);
      return;
    }

    if (type === MESSAGE_TYPE.ADD_USER_TO_ROOM && isIndexRoom(data)) {
      await handleAddUserToRoom(data, ws, wss.clients);
      updatePlayersRooms(wss.clients);
      return;
    }

    if (type === MESSAGE_TYPE.ADD_SHIPS) {
      handleAddShips(data as PlayerBoard, ws, wss.clients);
      return;
    }

    const errorMessage = "Incorrect message";
    ws.send(errorMessage);
    console.log(errorMessage);
  });
});
