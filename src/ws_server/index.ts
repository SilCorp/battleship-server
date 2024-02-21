import { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { CreatedUser, Message, MESSAGE_TYPE } from "./types";
import { createMessageStringified } from "./helpers/message";
import { isCredentials } from "./guards/isCredentials";
import { logRequest, logResponse } from "./helpers/logger";

export const wsServer = createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on("connection", (ws) => {
  ws.on("message", (request) => logRequest(request));
  ws.on("message", (rawMessage) => {
    const parsedMessage: Message = JSON.parse(rawMessage.toString());
    const { type, data } = parsedMessage;
    const parsedData: unknown = JSON.parse(data);

    switch (type) {
      case MESSAGE_TYPE.REG: {
        if (isCredentials(parsedData)) {
          const { name } = parsedData;
          const responseData: CreatedUser = {
            name,
            index: 123,
            error: false,
            errorText: "",
          };
          const response = createMessageStringified(type, responseData);
          ws.send(response);
          logResponse(response);
        }
        break;
      }
    }
  });
});
