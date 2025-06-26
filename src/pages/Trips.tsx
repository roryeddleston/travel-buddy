import { useTrips } from '../contexts/TripsContext';
import DestinationCard from '../components/DestinationCard';

function Trips() {
  const { trips } = useTrips();

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">My Trips</h1>
      {trips.length === 0 ? (
        <p className="text-subtext">No destinations saved yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((trip) => (
            <DestinationCard
              key={trip.id}
              name={trip.name}
              description={trip.description}
              image={trip.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Trips;