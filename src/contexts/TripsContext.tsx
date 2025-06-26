import { createContext, useContext, useState, ReactNode } from 'react';

export interface TripItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface TripsContextType {
  trips: TripItem[];
  addTrip: (item: TripItem) => void;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<TripItem[]>([]);

  const addTrip = (item: TripItem) => {
    setTrips((prev) => {
      if (prev.find((t) => t.id === item.id)) return prev; // prevent duplicates
      return [...prev, item];
    });
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) throw new Error("useTrips must be used within TripsProvider");
  return context;
};