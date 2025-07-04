import { useEffect, useState } from 'react';
import { getDestinations, Destination } from '../api/destinations';
import DestinationCard from '../components/DestinationCard';

function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="pt-20 pb-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">
        Explore Scenic Views
      </h1>
      {loading ? (
        <p className="text-subtext">Loading destinations...</p>
      ) : destinations.length === 0 ? (
        <p className="text-subtext">No destinations found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              name={destination.name}
              description={destination.description}
              image={destination.image}
              photographer={destination.photographer}
              profileUrl={destination.profileUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;