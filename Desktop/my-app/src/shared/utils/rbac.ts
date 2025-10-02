import type { UserRole } from '@/shared/types/user.types';

export const canEditRoom = (userRole: UserRole, roomAccessRole?: UserRole): boolean => {
  return userRole === 'admin' || roomAccessRole === 'admin';
};

export const canDeleteRoom = (userRole: UserRole): boolean => {
  return userRole === 'admin';
};

export const canViewRoom = (userRole: UserRole, roomAccessRole?: UserRole): boolean => {
  return userRole === 'admin' || roomAccessRole !== undefined;
};

export const canManageRoomUsers = (userRole: UserRole, roomAccessRole?: UserRole): boolean => {
  return userRole === 'admin' || roomAccessRole === 'admin';
};
