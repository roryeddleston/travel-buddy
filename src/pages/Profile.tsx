// src/pages/Profile.tsx

import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout. Try again.');
    }
  };

  return (
    <div className="pt-20 px-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-accent mb-6">My Profile</h1>

      <div className="bg-surface p-6 rounded-2xl shadow space-y-4">
        <p className="text-subtext">
          <span className="font-medium text-heading">Email:</span> {user.email}
        </p>

        {/* Add other user details if needed */}
        {/* e.g. displayName, photoURL, etc. */}

        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-md bg-accent text-white hover:opacity-90 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;