import { Message, MESSAGE_TYPE, MessageParsed } from "../types";

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

function parseEntireMessage(message: string): MessageParsed<unknown> {
  const parsedMessage: Message = JSON.parse(message);
  const { data } = parsedMessage;
  const parsedData = parseMessageData(data);

  return {
    ...parsedMessage,
    data: parsedData,
  };
}

function parseMessageData(data: string) {
  return data === "" ? data : JSON.parse(data);
}

export {
  createMessage,
  createMessageStringified,
  parseEntireMessage,
  parseMessageData,
};
