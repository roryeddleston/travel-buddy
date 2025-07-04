import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTrips } from '../contexts/TripsContext';
import { Destination } from '../api/destinations';
import { fetchWeather, WeatherData } from '../api/weather';

interface DestinationCardProps extends Omit<Destination, 'id'> {
  showAddButton?: boolean;
}

const DestinationCard = ({
  name,
  description,
  image,
  photographer,
  profileUrl,
  showAddButton = true,
}: DestinationCardProps) => {
  const { addTrip } = useTrips();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const handleAdd = () => {
    addTrip({ name, description, image });
    toast.success(`${name} added to your trip!`);
  };

  useEffect(() => {
    setWeatherLoading(true);
    fetchWeather(name)
      .then((data) => {
        setWeather(data);
        setWeatherError(null);
      })
      .catch((err) => {
        console.error(err);
        setWeatherError('Weather unavailable');
      })
      .finally(() => {
        setWeatherLoading(false);
      });
  }, [name]);

  return (
    <motion.div
      className="
        bg-surface
        rounded-2xl
        shadow-sm
        overflow-hidden
        border
        border-border
        hover:shadow-lg
        transition
      "
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="
            w-full
            h-48
            object-cover
            rounded-t-2xl
            transition
            duration-500
            group-hover:scale-105
          "
        />
      </div>
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-xl font-bold text-heading">{name}</h3>

        <p className="text-subtext text-sm mt-2 leading-relaxed">
          {description}
        </p>

        {/* Weather Section */}
        <div className="mt-3 text-sm text-subtext flex items-center gap-2">
          {weatherLoading ? (
            <span className="text-muted">Loading weather…</span>
          ) : weatherError ? (
            <span className="text-error">{weatherError}</span>
          ) : weather && (
            <>
              <img
                src={weather.iconUrl}
                alt={weather.description}
                className="w-6 h-6"
              />
              <span>
                {weather.temperature}°C –{' '}
                <span className="capitalize">{weather.description}</span>
              </span>
            </>
          )}
        </div>

        {photographer && profileUrl && (
          <p className="text-muted text-xs mt-3">
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
        )}

        {showAddButton && (
          <button
            onClick={handleAdd}
            className="
              mt-5
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
        )}
      </div>
    </motion.div>
  );
};

export default DestinationCard;