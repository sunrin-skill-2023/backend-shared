/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface IToken {
  token: string;
}

export interface IUUID {
  uuid: string;
}

export interface User {
  uuid?: string | undefined;
  email: string;
  name: string;
}

export interface ICreateAccessTokenByUUIDResponse {
  token: string;
}

export interface ICreateUser {
  email: string;
  name: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  getAccessTokenIsValid(request: IToken): Observable<User>;

  createAccessTokenByUuid(request: IUUID): Observable<ICreateAccessTokenByUUIDResponse>;

  getUserByUuid(request: IUUID): Observable<User>;

  createUser(request: ICreateUser): Observable<User>;
}

export interface AuthServiceController {
  getAccessTokenIsValid(request: IToken): Promise<User> | Observable<User> | User;

  createAccessTokenByUuid(
    request: IUUID,
  ):
    | Promise<ICreateAccessTokenByUUIDResponse>
    | Observable<ICreateAccessTokenByUUIDResponse>
    | ICreateAccessTokenByUUIDResponse;

  getUserByUuid(request: IUUID): Promise<User> | Observable<User> | User;

  createUser(request: ICreateUser): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getAccessTokenIsValid", "createAccessTokenByUuid", "getUserByUuid", "createUser"];
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
