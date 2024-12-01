export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}