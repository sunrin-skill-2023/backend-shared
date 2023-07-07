/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.proto";

export const protobufPackage = "board";

export interface IGetBoardById {
  id: string;
}

export interface IIsBoardOwner {
  boardId: string;
  userId: string;
}

export interface IIsBoardOwnerResponse {
  isOwner: boolean;
}

export interface IBoard {
  id: string;
  title: string;
  content: string;
  user: IUser | undefined;
  createdAt: Date | undefined;
}

export interface IUser {
  uuid: string;
  email: string;
  name: string;
  createdAt: Date | undefined;
}

export interface BoardList {
  boards: IBoard[];
}

export interface IUpdateBoard {
  id: string;
  title?: string | undefined;
  content?: string | undefined;
}

export interface ICreateBoard {
  title: string;
  content: string;
  userId: string;
}

export interface IDeleteBoard {
  id: string;
}

export const BOARD_PACKAGE_NAME = "board";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface BoardServiceClient {
  getBoardList(request: Empty): Observable<BoardList>;

  getBoardById(request: IGetBoardById): Observable<IBoard>;

  createBoard(request: ICreateBoard): Observable<IBoard>;

  deleteBoard(request: IDeleteBoard): Observable<Empty>;

  updateBoard(request: IUpdateBoard): Observable<IBoard>;

  isBoardOwner(request: IIsBoardOwner): Observable<IIsBoardOwnerResponse>;
}

export interface BoardServiceController {
  getBoardList(request: Empty): Promise<BoardList> | Observable<BoardList> | BoardList;

  getBoardById(request: IGetBoardById): Promise<IBoard> | Observable<IBoard> | IBoard;

  createBoard(request: ICreateBoard): Promise<IBoard> | Observable<IBoard> | IBoard;

  deleteBoard(request: IDeleteBoard): void;

  updateBoard(request: IUpdateBoard): Promise<IBoard> | Observable<IBoard> | IBoard;

  isBoardOwner(
    request: IIsBoardOwner,
  ): Promise<IIsBoardOwnerResponse> | Observable<IIsBoardOwnerResponse> | IIsBoardOwnerResponse;
}

export function BoardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getBoardList",
      "getBoardById",
      "createBoard",
      "deleteBoard",
      "updateBoard",
      "isBoardOwner",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BoardService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BoardService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BOARD_SERVICE_NAME = "BoardService";
