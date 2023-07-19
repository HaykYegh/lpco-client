export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  roles: Record<string, Array<string>>;
  username: string;
}
