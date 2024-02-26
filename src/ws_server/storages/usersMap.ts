import { Credentials } from "../types";

type UsersMap = Map<number, Credentials>;
const usersMap: UsersMap = new Map();

export { UsersMap, usersMap };
