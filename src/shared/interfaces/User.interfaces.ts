import { UserStatus } from '@shared/enums/UserStatus.enums';

export interface UserEntity {
  _id: string;
  username: string;
  email: string;
  country: string;
  phoneNumber: string;
  phoneVerified?: boolean;
  status: UserStatus;
}

export interface UserState {
  isAuth: boolean;
  user: UserEntity | null;
}

export interface UpdateUserInfoPayload {
  userId: string;
  username: string;
  email: string;
  phoneNumber?: string;
  country?: string;
}

export type UserHeaderData = Pick<UserEntity, 'username'>;
