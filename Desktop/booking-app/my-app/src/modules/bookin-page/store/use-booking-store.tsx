import { create } from "zustand";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "@/shared/lib/booking-crud";
import type { Booking } from "@/shared/lib/booking-crud";

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  loadBookings: (roomId: string) => Promise<void>;
  addBooking: (booking: Omit<Booking, "id">) => Promise<void>;
  editBooking: (
    id: string,
    data: Partial<Omit<Booking, "id">>
  ) => Promise<void>;
  removeBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  loading: false,
  loadBookings: async (roomId) => {
    set({ loading: true });
    try {
      const bookings = await fetchBookings(roomId);
      set({ bookings });
    } finally {
      set({ loading: false });
    }
  },
  addBooking: async (booking) => {
    set({ loading: true });
    try {
      const newBooking = await createBooking(booking);
      set((state) => ({ bookings: [...state.bookings, newBooking] }));
    } finally {
      set({ loading: false });
    }
  },
  editBooking: async (id, data) => {
    set({ loading: true });
    try {
      await updateBooking(id, data );
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, ...data } : b
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },
  removeBooking: async (id) => {
    const confirmDelete = confirm("Видалити бронювання?");
    if (!confirmDelete) return;

    set({ loading: true });
    try {
      await deleteBooking(id);
      set((state) => ({ bookings: state.bookings.filter((b) => b.id !== id) }));
    } finally {
      set({ loading: false });
    }
  },
}));
