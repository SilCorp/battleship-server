import { playersMap } from "../storages/playersMap";

function getUserConnectionByIndex(index: number) {
  for (const [ws, userIndex] of playersMap.entries()) {
    if (userIndex === index) {
      return ws;
    }
  }

  return undefined;
}

export { getUserConnectionByIndex };
