export interface UserEntity {
  _id: string;
  username: string;
  email: string;
}

export interface UserState {
  isAuth: boolean;
  user: UserEntity;
}

export type UserHeaderData = Pick<UserEntity, 'username'>;
