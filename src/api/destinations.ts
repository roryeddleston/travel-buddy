import { http } from './http';

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const getDestinations = (): Promise<Destination[]> => {
  return http<Destination[]>('/destinations');
};