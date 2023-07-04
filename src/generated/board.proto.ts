/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.proto";

export const protobufPackage = "board";

export interface IBoard {
  id: string;
  title?: string | undefined;
  content?: string | undefined;
  writer: string;
}

export interface BoradList {
  boards: IBoard[];
}

export interface ICreateBoard {
  title: string;
  content: string;
  writer: string;
}

export interface IDeleteBorad {
  id: string;
}

export const BOARD_PACKAGE_NAME = "board";

export interface BoardServiceClient {
  getBoradList(request: Empty): Observable<BoradList>;

  createBorad(request: ICreateBoard): Observable<IBoard>;

  deleteBorad(request: IBoard): Observable<Empty>;

  updateBorad(request: IBoard): Observable<IBoard>;
}

export interface BoardServiceController {
  getBoradList(request: Empty): Promise<BoradList> | Observable<BoradList> | BoradList;

  createBorad(request: ICreateBoard): Promise<IBoard> | Observable<IBoard> | IBoard;

  deleteBorad(request: IBoard): void;

  updateBorad(request: IBoard): Promise<IBoard> | Observable<IBoard> | IBoard;
}

export function BoardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBoradList", "createBorad", "deleteBorad", "updateBorad"];
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
