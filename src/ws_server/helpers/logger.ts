import { parseEntireMessage } from "./message";
import { RawData } from "ws";

function logMessage(message: string) {
  const parsedMessage = parseEntireMessage(message);
  console.log(parsedMessage);
}

function logRequest(request: RawData) {
  const stringifiedRequest = request.toString();
  console.log("Request:");
  logMessage(stringifiedRequest);
}

function logResponse(response: string) {
  console.log("Response:");
  logMessage(response);
}

export { logMessage, logRequest, logResponse };
