import { IBadge } from '~/data';

export type IProgress = {
  activityId: string;
  score: number;
  total: number;
  date: string;
  time: string;
  room: string;
};

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: string;
  contactNumber: string;
  email: string;
  name: string;
  roles: ROLES[];

  firstName: string;
  middleInitial: string;
  surname: string;
  username: string;
  password: string;
  birthday: string;
  gender: string;
  progress?: IProgress[];
  badges?: IBadge[] | [];
}
