import { WebSocket } from "ws";

export enum MESSAGE_TYPE {
  REG = "reg",
  CREATE_GAME = "create_game",
  START_GAME = "start_game",
  TURN = "turn",
  ATTACK = "attack",
  FINISH = "finish",
  UPDATE_WINNERS = "update_winners",
  UPDATE_ROOM = "update_room",
  CREATE_ROOM = "create_room",
  ADD_USER_TO_ROOM = "add_user_to_room",
  ADD_SHIPS = "add_ships",
  RANDOM_ATTACK = "randomAttack",
}

export interface Message {
  type: MESSAGE_TYPE;
  data: string;
  id: number;
}

export interface MessageParsed<T> {
  type: MESSAGE_TYPE;
  data: T;
  id: number;
}

export interface Credentials {
  name: string;
  password: string;
}

export interface Error {
  error: boolean;
  errorText: string;
}

export interface User {
  name: string;
  index: number;
}

export type CreatedUser = User & Error;

export interface Winner {
  name: string;
  wins: number;
}

export type Winners = Winner[];

export interface IndexRoom {
  indexRoom: number;
}

export interface Game {
  idGame: number;
  idPlayer: number;
}

export interface Room {
  roomId: number;
  roomUsers: User[];
}

export type Rooms = Room[];

export interface Position {
  x: number;
  y: number;
}

export enum SHIP_TYPE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  HUGE = "huge",
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: SHIP_TYPE;
}

export interface GameBoard {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

export interface GameStart {
  ships: Ship[];
  currentPlayerIndex: number;
}

export interface AttackRandom {
  gameId: number;
  indexPlayer: number;
}

export type Attack = AttackRandom & Position;

export enum ATTACK_STATUS {
  MISS = "miss",
  KILLED = "killed",
  SHOT = "shot",
}

export interface AttackFeedback {
  position: Position;
  currentPlayer: number;
  status: ATTACK_STATUS;
}

export interface Turn {
  currentPlayer: number;
}

export interface Finish {
  winPlayer: number;
}

export type Handler<T> = (
  data: T,
  ws: WebSocket,
  clients: Set<WebSocket>,
) => void | Promise<void>;
