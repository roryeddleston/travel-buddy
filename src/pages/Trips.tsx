import { useTrips } from '../contexts/TripsContext';
import toast from 'react-hot-toast';

function Trips() {
  const { trips, removeTrip } = useTrips();

  const handleRemove = (id: string, name: string) => {
    removeTrip(id);
    toast(`${name} removed from your trip.`);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">My Trips</h1>
      {trips.length === 0 ? (
        <p className="text-subtext">No destinations saved yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-surface rounded-2xl shadow-md overflow-hidden"
            >
              <img src={trip.image} alt={trip.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-accent">{trip.name}</h3>
                <p className="text-subtext text-sm mt-2">{trip.description}</p>
                <button
                  onClick={() => handleRemove(trip.id, trip.name)}
                  className="mt-4 px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:opacity-90"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trips;