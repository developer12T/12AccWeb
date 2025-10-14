export type UserAuth = {
  username: string;
  fullName: string;
  role: string;
  token: string;
};

export interface LoginResponse {
  status: number;
  data: UserAuth[];
}
