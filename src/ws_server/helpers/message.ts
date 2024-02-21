import { Message, MESSAGE_TYPE } from "../types";

function createMessage<T>(type: MESSAGE_TYPE, data: T, id = 0): Message {
  return {
    type,
    data: JSON.stringify(data),
    id,
  };
}

function createMessageStringified(...params: Parameters<typeof createMessage>) {
  const message = createMessage(...params);

  return JSON.stringify(message);
}

function parseEntireMessage(message: string) {
  const parsedMessage: Message = JSON.parse(message);
  const { data } = parsedMessage;
  const parsedData = JSON.parse(data);

  return {
    ...parsedMessage,
    data: parsedData,
  };
}

export { createMessage, createMessageStringified, parseEntireMessage };
