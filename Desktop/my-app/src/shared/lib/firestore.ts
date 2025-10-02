import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export interface Room {
  id: string;
  name: string;
  description: string;
  createdAt?: unknown;
}

const roomsCol = collection(db, "meetingRooms");


export const fetchRooms = async (): Promise<Room[]> => {
  const snapshot = await getDocs(roomsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Room[];
};


export const createRoom = async (
  name: string,
  description: string
): Promise<Room> => {
  const docRef = await addDoc(roomsCol, {
    name,
    description,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, name, description };
};


export const updateRoom = async (
  id: string,
  data: { name?: string; description?: string }
) => {
  const roomRef = doc(db, "meetingRooms", id);
  await updateDoc(roomRef, data);
};

  
export const deleteRoom = async (id: string) => {
  const roomRef = doc(db, "meetingRooms", id);
  await deleteDoc(roomRef);
};
