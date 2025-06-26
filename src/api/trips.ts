import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export interface Trip {
  id?: string;
  name: string;
  description: string;
  image: string;
  userId: string;
}

export const saveTrip = async (trip: Trip) => {
  await addDoc(collection(db, 'trips'), trip);
};

export const fetchTrips = async (userId: string): Promise<Trip[]> => {
  const q = query(collection(db, 'trips'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Trip));
};

export const deleteTrip = async (id: string) => {
  await deleteDoc(doc(db, 'trips', id));
};