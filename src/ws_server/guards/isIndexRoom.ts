import { IndexRoom } from "../types";

function isIndexRoom(indexRoom: unknown): indexRoom is IndexRoom {
  const { indexRoom: index } = indexRoom as IndexRoom;

  return typeof index === "number";
}

export { isIndexRoom };
