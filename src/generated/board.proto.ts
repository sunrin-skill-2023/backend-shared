/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.proto";

export const protobufPackage = "board";

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

export interface IDeleteBorad {
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

  createBorad(request: ICreateBoard): Observable<IBoard>;

  deleteBorad(request: IDeleteBorad): Observable<Empty>;

  updateBorad(request: IUpdateBoard): Observable<IBoard>;
}

export interface BoardServiceController {
  getBoardList(request: Empty): Promise<BoardList> | Observable<BoardList> | BoardList;

  createBorad(request: ICreateBoard): Promise<IBoard> | Observable<IBoard> | IBoard;

  deleteBorad(request: IDeleteBorad): void;

  updateBorad(request: IUpdateBoard): Promise<IBoard> | Observable<IBoard> | IBoard;
}

export function BoardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBoardList", "createBorad", "deleteBorad", "updateBorad"];
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
