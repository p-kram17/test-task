import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export interface Booking {
  id: string;
  roomId: string;
  title: string;
  description?: string;
  startTime: string; 
  endTime: string; 
  createdAt?: unknown;
}

const bookingsCol = collection(db, "bookings");


export const fetchBookings = async (roomId: string): Promise<Booking[]> => {
  const q = query(bookingsCol, where("roomId", "==", roomId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
};


export const isBookingConflict = async (
  roomId: string,
  startTime: string,
  endTime: string,
  ignoreId?: string
) => {
  const bookings = await fetchBookings(roomId);
  return bookings.some(
    (b) =>
      b.id !== ignoreId &&
      ((startTime >= b.startTime && startTime < b.endTime) ||
        (endTime > b.startTime && endTime <= b.endTime) ||
        (startTime <= b.startTime && endTime >= b.endTime))
  );
};


export const createBooking = async (
  booking: Omit<Booking, "id">
): Promise<Booking> => {
  const conflict = await isBookingConflict(
    booking.roomId,
    booking.startTime,
    booking.endTime
  );
  if (conflict)
    throw new Error("Час бронювання конфліктує з іншими бронюваннями");

  const docRef = await addDoc(bookingsCol, booking);
  return { id: docRef.id, ...booking };
};

export const updateBooking = async (
  id: string,
  data: Partial<Omit<Booking, "id">>
) => {
  if (data.startTime && data.endTime && data.roomId) {
    const conflict = await isBookingConflict(
      data.roomId,
      data.startTime,
      data.endTime,
      id
    );
    if (conflict)
      throw new Error("Час бронювання конфліктує з іншими бронюваннями");
  }
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, data);
};


export const deleteBooking = async (id: string) => {
  const bookingRef = doc(db, "bookings", id);
  await deleteDoc(bookingRef);
};
