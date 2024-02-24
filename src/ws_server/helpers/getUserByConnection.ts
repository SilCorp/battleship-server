import { WebSocket } from "ws";
import { playersMap } from "../storages/playersMap";
import { usersMap } from "../storages/usersMap";
import { User } from "../types";

async function getUserByConnection(ws: WebSocket): Promise<User> {
  const userIndex = playersMap.get(ws);
  if (userIndex === undefined) {
    throw new Error("Player not found");
  }

  const user = usersMap.get(userIndex);
  if (user === undefined) {
    throw new Error("Player not found");
  }

  const { name: userName } = user;

  return {
    index: userIndex,
    name: userName,
  };
}

export { getUserByConnection };
