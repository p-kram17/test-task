import { create } from "zustand";
import type { User, UserRole, RoomAccess } from "@/shared/types/user.types";

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  hasRoomAccess: (roomId: string, requiredRole?: UserRole) => boolean;
  addRoomAccess: (roomId: string, role: UserRole) => void;
  removeRoomAccess: (roomId: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
  hasRoomAccess: (roomId, requiredRole = 'user') => {
    const { user } = get();
    if (!user) return false;
    if (user.role === 'admin') return true;
    
    const roomAccess = user.rooms?.find(room => room.roomId === roomId);
    if (!roomAccess) return false;
    
    if (requiredRole === 'user') return true;
    return roomAccess.role === 'admin';
  },
  addRoomAccess: (roomId, role) => {
    const { user } = get();
    if (!user) return;

    const existingAccess = user.rooms?.find(r => r.roomId === roomId);
    if (existingAccess) {
      // Update existing access
      set({
        user: {
          ...user,
          rooms: user.rooms?.map(r => 
            r.roomId === roomId ? { ...r, role } : r
          ) || []
        }
      });
    } else {
      // Add new access
      set({
        user: {
          ...user,
          rooms: [...(user.rooms || []), { roomId, role }]
        }
      });
    }
  },
  removeRoomAccess: (roomId) => {
    const { user } = get();
    if (!user) return;

    set({
      user: {
        ...user,
        rooms: user.rooms?.filter(r => r.roomId !== roomId) || []
      }
    });
  },
}));
