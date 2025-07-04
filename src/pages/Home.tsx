import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left side content */}
      <div className="flex flex-col justify-center items-center px-8 py-16 text-center bg-surface">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-accent mb-4">
            Plan Your Dream Trips
          </h1>
          <p className="text-lg text-subtext mb-8">
            Discover destinations and save your favorites for your next adventure. Get inspired with real images from Unsplash.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            {/* Outline button */}
            <Link
              to="/signup"
              className="
                inline-flex
                justify-center
                items-center
                w-52
                h-12
                border-2
                border-teal-700
                text-white
                font-semibold
                rounded-lg
                hover:bg-teal-700
                hover:text-white
                transition
                box-border
              "
            >
              Get Started
            </Link>

            {/* Solid button */}
            <Link
              to="/destinations"
              className="
                inline-flex
                justify-center
                items-center
                w-52
                h-12
                bg-teal-700
                text-white
                font-semibold
                rounded-lg
                hover:bg-teal-800
                transition
                box-border
              "
            >
              Explore Destinations
            </Link>
          </div>

          {/* Features section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-30">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🌍</span>
              <h3 className="text-accent font-semibold text-lg mb-1">Explore Destinations</h3>
              <p className="text-subtext text-sm text-center">
                Browse real photos from beautiful places worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">💾</span>
              <h3 className="text-accent font-semibold text-lg mb-1">Save Your Trips</h3>
              <p className="text-subtext text-sm text-center">
                Collect your favorite spots and plan your travels.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">✨</span>
              <h3 className="text-accent font-semibold text-lg mb-1">Get Inspired</h3>
              <p className="text-subtext text-sm text-center">
                See beautiful places and fuel your wanderlust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side image */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/home_hero.jpg')`
        }}

      ></div>
    </div>
  );
}

export default Home;