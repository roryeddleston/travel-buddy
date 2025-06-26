import { useEffect, useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import { Destination, getDestinations } from '../api/destinations';

function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations()
      .then(setDestinations)
      .catch((err) => console.error('Failed to fetch destinations:', err));
  }, []);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">Explore Destinations</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            id={dest.id}
            name={dest.name}
            description={dest.description}
            image={dest.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Destinations;