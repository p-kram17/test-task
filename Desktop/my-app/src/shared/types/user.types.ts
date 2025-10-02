export type UserRole = 'admin' | 'user';

export interface RoomAccess {
  roomId: string;
  role: UserRole;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  rooms?: RoomAccess[];
}
