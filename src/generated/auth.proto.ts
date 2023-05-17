/* eslint-disable */
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface AuthRequest {}

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

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  auth(request: AuthRequest, metadata?: Metadata): Observable<AuthResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<TokenResponse>;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Observable<TokenResponse>;
}

export interface AuthServiceController {
  auth(
    request: AuthRequest,
    metadata?: Metadata,
    call?: ServerUnaryCall<any, any>,
  ): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  login(
    request: LoginRequest,
    metadata?: Metadata,
  ): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['auth', 'login', 'register'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
