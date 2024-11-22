export interface IRoom {
  id: string;
  createdAt: string;
  roomNumber: string;
  active: boolean;
  members: string[];
  activity: string;
  status: 'waiting' | 'playing' | 'finished';
  chat: {
    user: string;
    message: string;
    createdAt: string;
  }[];
}

// export const rooms: IRoom[] = [
//   {
//     roomNumber: 'room1',
//     active: true,
//   },
// ];
