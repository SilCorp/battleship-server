import { WebSocketServer } from "ws";
import { createServer } from "node:http";

export const wsServer = createServer();
const wss = new WebSocketServer({ server: wsServer });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });
});
