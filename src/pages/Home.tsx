import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
  return (
    <div className="pt-20 px-4 text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-4">Welcome to Travel Buddy!</h1>
      <p className="text-subtext text-lg mb-6">Plan your dream trips and explore the world with ease.</p>
      <Link
        to="/signup"
        className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90"
      >
        Get Started – Sign Up
      </Link>
    </div>
  );
}

export default Home;