import { motion } from 'framer-motion';

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
}

const DestinationCard = ({ name, description, image }: DestinationCardProps) => {
  return (
    <motion.div
      className="bg-surface rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-accent">{name}</h3>
        <p className="text-subtext text-sm mt-2">{description}</p>
        <button className="mt-4 px-4 py-2 text-sm rounded-md bg-accent text-white hover:opacity-90">
          Add to Trip
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;