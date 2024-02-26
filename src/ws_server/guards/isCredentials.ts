import { Credentials } from "../types";

function isCredentials(credentials: unknown): credentials is Credentials {
  const { name, password } = credentials as Credentials;

  return typeof name === "string" && typeof password === "string";
}

export { isCredentials };
