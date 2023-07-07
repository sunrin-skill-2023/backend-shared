/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface IToken {
  token: string;
}

export interface IUUID {
  uuid: string;
}

export interface PartialUser {
  uuid?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
}

export interface IUser {
  uuid: string;
  email: string;
  name: string;
  createdAt: Date | undefined;
}

export interface ICreateAccessTokenByUUIDResponse {
  token: string;
}

export interface ICreateUser {
  email: string;
  name: string;
}

export const AUTH_PACKAGE_NAME = "auth";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface AuthServiceClient {
  getAccessTokenIsValid(request: IToken): Observable<IUser>;

  createAccessTokenByUuid(request: IUUID): Observable<ICreateAccessTokenByUUIDResponse>;

  getUserByUuid(request: IUUID): Observable<IUser>;

  getUserByPartialData(request: PartialUser): Observable<IUser>;

  createUser(request: ICreateUser): Observable<IUser>;
}

export interface AuthServiceController {
  getAccessTokenIsValid(request: IToken): Promise<IUser> | Observable<IUser> | IUser;

  createAccessTokenByUuid(
    request: IUUID,
  ):
    | Promise<ICreateAccessTokenByUUIDResponse>
    | Observable<ICreateAccessTokenByUUIDResponse>
    | ICreateAccessTokenByUUIDResponse;

  getUserByUuid(request: IUUID): Promise<IUser> | Observable<IUser> | IUser;

  getUserByPartialData(request: PartialUser): Promise<IUser> | Observable<IUser> | IUser;

  createUser(request: ICreateUser): Promise<IUser> | Observable<IUser> | IUser;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getAccessTokenIsValid",
      "createAccessTokenByUuid",
      "getUserByUuid",
      "getUserByPartialData",
      "createUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
