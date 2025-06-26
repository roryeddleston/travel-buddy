import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Trip, getTrips as fetchTrips, addTrip as saveTrip } from '../api/trips';

interface TripsContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  // Load trips from API on mount
  useEffect(() => {
    fetchTrips()
      .then(setTrips)
      .catch((err) => console.error('Failed to load trips:', err));
  }, []);

  const addTrip = (trip: Trip) => {
    const exists = trips.some((t) => t.id === trip.id);
    if (exists) return;

    saveTrip(trip)
      .then((savedTrip) => setTrips((prev) => [...prev, savedTrip]))
      .catch((err) => console.error('Failed to add trip:', err));
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) throw new Error('useTrips must be used within a TripsProvider');
  return context;
};