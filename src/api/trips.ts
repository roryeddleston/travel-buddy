import { http } from './http';

export interface Trip {
  id: string;
  name: string;
  description: string;
  image: string;
}

let mockTrips: Trip[] = []; // local memory mock

// GET /trips
export const getTrips = (): Promise<Trip[]> => {
  return Promise.resolve(mockTrips);
};

// POST /trips
export const addTrip = (trip: Trip): Promise<Trip> => {
  const exists = mockTrips.some((t) => t.id === trip.id);
  if (!exists) mockTrips.push(trip);
  return Promise.resolve(trip);
};