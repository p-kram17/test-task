import { create } from "zustand";
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/shared/lib/firestore";
import type { Room } from "@/shared/lib/firestore";
interface RoomState {
  rooms: Room[];
  loading: boolean;
  loadRooms: () => Promise<void>;
  addRoom: (name: string, description: string) => Promise<void>;
  editRoom: (
    id: string,
    data: { name?: string; description?: string }
  ) => Promise<void>;
  removeRoom: (id: string) => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  loading: false,
  loadRooms: async () => {
    set({ loading: true });
    try {
      const rooms = await fetchRooms();
      set({ rooms });
    } finally {
      set({ loading: false });
    }
  },
  addRoom: async (name, description) => {
    set({ loading: true });
    try {
      const newRoom = await createRoom(name, description);
      set((state) => ({ rooms: [...state.rooms, newRoom] }));
    } finally {
      set({ loading: false });
    }
  },
  editRoom: async (id, data) => {
    set({ loading: true });
    try {
      await updateRoom(id, data);
      set((state) => ({
        rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...data } : r)),
      }));
    } finally {
      set({ loading: false });
    }
  },
  removeRoom: async (id) => {
    const confirmDelete = confirm("Видалити кімнату?");
    if (!confirmDelete) return;

    set({ loading: true });
    try {
      await deleteRoom(id);
      set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) }));
    } finally {
      set({ loading: false });
    }
  },
}));
