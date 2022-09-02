export interface TokenResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type User = {
  name: string;
  email?: string;
  id: string;
  token: string;
  refreshToken?: string;
};
