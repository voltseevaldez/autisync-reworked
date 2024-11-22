import { IUser, ROLES } from '~/types';

export const loggedUser: IUser = {
  email: 'test@email.com',
  contactNumber: '0273492039482',
  firstName: 'Jhaunn',
  middleInitial: 'M.',
  surname: 'Jerjer',
  gender: 'Male',

  // TODO: These are the same thing
  name: 'Jhaunn',
  username: 'Jhaunn',
  password: '123123123',

  roles: [ROLES.USER],
  id: '0',
  birthday: 'May 20, 2003',
  badges: [],
};

export const allUsers: IUser[] = [
  //? Logged User
  {
    email: 'test@email.com',
    contactNumber: '0273492039482',
    firstName: 'Jhaunn',
    middleInitial: 'M.',
    surname: 'Jerjer',
    gender: 'Male',

    // TODO: These are the same thing
    name: 'Jhaunn',
    username: 'Jhaunn',
    password: '123123123',

    roles: [ROLES.USER],
    id: '0',
    birthday: 'May 20, 2003',
    badges: [],
  },

  // ?
  {
    email: 'test1@email.com',
    contactNumber: '0273492039482',
    firstName: 'Violet',
    middleInitial: 'M.',
    surname: 'Vanderdaught',
    gender: 'Male',
    id: '1',
    birthday: 'June 20, 2003',
    badges: [],
    // TODO: These are the same thing
    name: 'Vi',
    username: 'vi',

    password: '456456456',
    roles: [ROLES.USER],
  },

  {
    email: 'test2@email.com',
    contactNumber: '0273492039482',
    firstName: 'Gusion',
    middleInitial: 'X',
    surname: 'Dela Cruz',
    gender: 'Male',
    id: '2',
    birthday: 'May 20, 2003',
    badges: [],

    // TODO: These are the same thing
    name: 'Gusion',
    username: 'Gusion',

    password: '789789789',
    roles: [ROLES.USER],
  },
];
