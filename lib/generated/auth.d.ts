import { Observable } from "rxjs";
export declare const protobufPackage = "auth";
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
export declare const AUTH_PACKAGE_NAME = "auth";
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
export declare function AuthServiceControllerMethods(): (constructor: Function) => void;
export declare const AUTH_SERVICE_NAME = "AuthService";
