/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface AuthRequest {
}

export interface AuthResponse {
  name: string;
}

export interface TokenResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  auth(request: AuthRequest): Observable<AuthResponse>;

  login(request: LoginRequest): Observable<TokenResponse>;

  register(request: RegisterRequest): Observable<TokenResponse>;
}

export interface AuthServiceController {
  auth(request: AuthRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  login(request: LoginRequest): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse;

  register(request: RegisterRequest): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["auth", "login", "register"];
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
