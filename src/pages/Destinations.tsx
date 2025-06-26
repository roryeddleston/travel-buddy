import DestinationCard from '../components/DestinationCard';
import { mockDestinations } from '../utils/mockDestinations';

function Destinations() {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">Explore Destinations</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {mockDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
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