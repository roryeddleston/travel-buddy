import { useEffect, useState } from 'react';
import { getTrips, Trip } from '../api/trips';

function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getTrips()
      .then(setTrips)
      .catch((err) => console.error('Failed to load trips:', err));
  }, []);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">My Trips</h1>
      {trips.length === 0 ? (
        <p className="text-subtext">You haven’t added any trips yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-surface rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={trip.image}
                alt={trip.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-accent">
                  {trip.name}
                </h3>
                <p className="text-subtext text-sm mt-2">
                  {trip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trips;