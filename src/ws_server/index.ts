import { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { MESSAGE_TYPE } from "./types";
import { parseEntireMessage } from "./helpers/message";
import { isCredentials } from "./guards/isCredentials";
import { logRequest, logResponse } from "./helpers/logger";
import { handleUser } from "./handlers/handleUser";

export const wsServer = createServer();

const wss = new WebSocketServer({ server: wsServer, clientTracking: true });

wss.on("connection", (ws) => {
  ws.on("message", (request) => logRequest(request));
  ws.on("message", async (rawMessage) => {
    const parsedMessage = parseEntireMessage(rawMessage.toString());
    const { type, data } = parsedMessage;

    switch (type) {
      case MESSAGE_TYPE.REG: {
        if (isCredentials(data)) {
          await handleUser(data, ws, wss.clients);
          break;
        }
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        const errorMessage = "Incorrect message";
        ws.send(errorMessage);
        console.log(errorMessage);
      }
    }
  });
});
