import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const featureVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
      {/* Left side content */}
      <motion.div
        className="flex flex-col justify-center items-center px-8 py-16 text-center bg-surface"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold text-accent mb-4 mt-[30px] sm:mt-0"
          >
            Plan your dream trips
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-subtext mb-8"
          >
            Discover destinations and save your favorites for your next adventure. Get inspired with real images from Unsplash.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex justify-center items-center w-52 h-12 border-2 border-teal-700 text-white font-semibold rounded-lg hover:bg-teal-700 hover:text-white transition box-border"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/destinations"
                className="inline-flex justify-center items-center w-52 h-12 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition box-border"
              >
                Explore Destinations
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-30"
            variants={containerVariants}
          >
            {[
              {
                icon: '🌍',
                title: 'Explore Destinations',
                desc: 'Browse real photos from beautiful places worldwide.',
              },
              {
                icon: '💾',
                title: 'Save Your Trips',
                desc: 'Collect your favorite spots and plan your travels.',
              },
              {
                icon: '✨',
                title: 'Get Inspired',
                desc: 'See beautiful places and fuel your wanderlust.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                variants={featureVariant}
              >
                <span className="text-4xl mb-2">{feature.icon}</span>
                <h3 className="text-accent font-semibold text-lg mb-1">
                  {feature.title}
                </h3>
                <p className="text-subtext text-sm text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side image */}
      <motion.div
        className="hidden md:block bg-cover bg-center"
        variants={imageVariant}
        initial="hidden"
        animate="visible"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/home_hero.jpg')`,
        }}
      ></motion.div>
    </div>
  );
}

export default Home;