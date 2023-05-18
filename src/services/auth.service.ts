import { IUUID, User } from 'src/generated/auth.proto';

export interface AuthService {
  getUserByUuid(request: IUUID): Promise<User>;
  createAccessTokenByUuid(request: IUUID): Promise<string>;
  getAccessTokenIsValid(request: string): Promise<User>;
  createUser(request: User): Promise<User>;
}
