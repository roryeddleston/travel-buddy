import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTrips } from '../contexts/TripsContext';
import { Destination } from '../api/destinations';

const DestinationCard = ({
  name,
  description,
  image,
  photographer,
  profileUrl,
}: Omit<Destination, 'id'>) => {
  const { addTrip } = useTrips();

  const handleAdd = () => {
    addTrip({ name, description, image });
    toast.success(`${name} added to your trip!`);
  };

  return (
    <motion.div
      className="bg-surface rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-accent">{name}</h3>
        <p className="text-subtext text-sm mt-2">{description}</p>
        <p className="text-muted text-xs mt-1">
          Photo by{' '}
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            {photographer}
          </a>
        </p>
        <button
          onClick={handleAdd}
          className="
            mt-4
            w-full
            rounded-md
            bg-teal-500
            text-white
            font-semibold
            py-2
            transition
            duration-300
            hover:bg-teal-600
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-teal-500
            active:scale-95
          "
        >
          Add to Trip
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;