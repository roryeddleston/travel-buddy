import { useEffect, useState } from 'react';
import { getDestinations, Destination } from '../api/destinations';
import DestinationCard from '../components/DestinationCard';
import { fetchPhotoForDestination } from '../api/destinations';
import toast from 'react-hot-toast';

function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load destinations.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error('Please enter a search term.');
      return;
    }

    setSearching(true);

    try {
      const result = await fetchPhotoForDestination(searchTerm.trim());
      setDestinations([result]);
      toast.success(`Found images for ${searchTerm}!`);
    } catch (error) {
      console.error(error);
      toast.error(`No results found for "${searchTerm}".`);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="pt-20 pb-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">
        Explore Scenic Views
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-col sm:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Search for a destination…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 rounded-md border border-border bg-background text-foreground"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-md bg-accent text-white font-semibold hover:opacity-90 transition"
          disabled={searching}
        >
          {searching ? 'Searching…' : 'Search'}
        </button>
      </form>

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