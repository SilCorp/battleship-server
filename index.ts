import { httpServer } from "./src/http_server";
import { wsServer } from "./src/ws_server";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

wsServer.listen(WS_PORT, () => {
  console.log(`Start WebSocket server on the ${WS_PORT} port!`);
});
