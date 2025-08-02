export interface AuthState {
  isAuthenticated: boolean;
  isRemembered: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
