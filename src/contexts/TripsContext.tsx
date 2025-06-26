import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Trip, fetchTrips, saveTrip, deleteTrip as apiDeleteTrip } from '../api/trips';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../api/firebase';

interface TripsContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'userId' | 'id'>) => void;
  deleteTrip: (id: string) => void;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      if (user?.uid) {
        try {
          const userTrips = await fetchTrips(user.uid);
          setTrips(userTrips);
        } catch (err) {
          console.error('Failed to load trips:', err);
        }
      } else {
        setTrips([]);
      }
    };

    loadTrips();
  }, [user]);

  const addTrip = async (trip: Omit<Trip, 'userId' | 'id'>) => {
    if (!user?.uid) return;
    const docRef = await addDoc(collection(db, 'trips'), {
      ...trip,
      userId: user.uid,
    });
    const newTrip: Trip = { ...trip, userId: user.uid, id: docRef.id };
    setTrips((prev) => [...prev, newTrip]);
  };

  const deleteTrip = async (id: string) => {
    await apiDeleteTrip(id);
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, deleteTrip }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) throw new Error('useTrips must be used within TripsProvider');
  return context;
};