import { CreatedUser, Credentials, Handler, MESSAGE_TYPE } from "../types";
import { createMessageStringified } from "../helpers/message";
import { logResponse } from "../helpers/logger";
import { playersMap } from "../storages/playersMap";
import { generateId } from "../helpers/generateId";
import { usersMap } from "../storages/usersMap";

const handleUser: Handler<Credentials> = async (credentials, ws) => {
  const { name } = credentials;
  let index: number;
  let response: string;

  try {
    if (await isUserRegistered(name)) {
      index = await loginUser(credentials);
      const responseData: CreatedUser = {
        name,
        index,
        error: false,
        errorText: "",
      };
      response = createMessageStringified(MESSAGE_TYPE.REG, responseData);
    } else {
      index = await registerUser(credentials);
      const responseData: CreatedUser = {
        name,
        index,
        error: false,
        errorText: "",
      };
      response = createMessageStringified(MESSAGE_TYPE.REG, responseData);
    }
  } catch (err) {
    const responseData: CreatedUser = {
      name,
      index,
      error: true,
      errorText: err.message,
    };
    response = createMessageStringified(MESSAGE_TYPE.REG, responseData);
    ws.send(response);
    logResponse(response);
    return;
  }

  playersMap.set(ws, index);

  ws.send(response);
  logResponse(response);
};

async function registerUser(credentials: Credentials) {
  const userId = generateId();
  usersMap.set(userId, credentials);

  return userId;
}

async function getUserByName(userName: string) {
  for (const [key, { name }] of usersMap.entries()) {
    if (name === userName) {
      return {
        index: key,
        credentials: usersMap.get(key),
      };
    }
  }

  throw new Error(`User "${userName}" does not exist`);
}

async function isUserRegistered(userName: string) {
  try {
    await getUserByName(userName);
    return true;
  } catch {
    return false;
  }
}

async function loginUser(credentials: Credentials) {
  const { name, password: providedPassword } = credentials;
  const {
    index,
    credentials: { password: originalPassword },
  } = await getUserByName(name);

  if (providedPassword !== originalPassword) {
    throw new Error("User already exists");
  }

  return index;
}

export { handleUser };
