export interface RootState {
  user: UserState;
}

export interface UserState {
  user: object | null;
  isAuthenticated: boolean;
}