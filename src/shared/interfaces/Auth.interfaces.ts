import { UserEntity } from '@shared/interfaces/User.interfaces';

// User entity type
export interface User {
  username: string;
  email: string;
  region: string;
}

// Authentication request type
export interface AuthCredentials {
  email: string;
  password: string;
}

// Authentication response type
export interface AuthResponse {
  user: UserEntity;
}
