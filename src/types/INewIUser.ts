export interface INewUser {
  id: string;
  displayName: string;
  contactNo: string;
  roles: ('customer' | 'admin' | 'seller' | 'super_admin')[];

  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  username: string;
  birthday: string;
  gender: string;
  password: string;
}
