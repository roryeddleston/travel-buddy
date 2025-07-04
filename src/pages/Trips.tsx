import { FiTrash2 } from 'react-icons/fi';
import DestinationCard from '../components/DestinationCard';
import { useTrips } from '../contexts/TripsContext';

function Trips() {
  const { trips, deleteTrip } = useTrips();

  return (
    <div className="pt-26 pb-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-8">My Trips</h1>

      {trips.length === 0 ? (
        <p className="text-subtext">You haven’t added any trips yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trips
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((trip) => (
              <div key={trip.id} className="relative">
                <DestinationCard
                  name={trip.name}
                  description={trip.description}
                  image={trip.image}
                  photographer={trip.photographer}
                  profileUrl={trip.profileUrl}
                  showAddButton={false}
                />

                <button
                  onClick={() => deleteTrip(trip.id)}
                  className="
                    absolute top-2 right-2
                    bg-white text-red-500
                    rounded-full p-1
                    shadow
                    hover:bg-red-50
                    hover:text-red-600
                    hover:scale-105
                    transition
                  "
                  aria-label="Delete trip"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Trips;