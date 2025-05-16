export interface UserEntity {
  _id: string;
  username: string;
  email: string;
  region: string;
  phoneNumber: string;
  phoneVerified?: boolean;
  status?: 'confirmed' | 'to_confirm';
}

export interface UserState {
  isAuth: boolean;
  user: UserEntity;
}

export interface UpdateUserInfoPayload {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export type UserHeaderData = Pick<UserEntity, 'username'>;
