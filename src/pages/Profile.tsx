import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

function Profile() {
  const { user, logout, updateUserProfile } = useAuth();

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

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

  const handleSave = async () => {
    try {
      await updateUserProfile({
        displayName,
        photoURL,
      });
      toast.success('Profile updated!');
      setEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="pt-26 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8 mt-6 text-center">
        Profile
      </h1>

      <div className="max-w-xl mx-auto bg-surface p-6 rounded-2xl shadow space-y-6 border">
        <div className="flex items-center gap-4">
          <img
            src={
              photoURL ||
              'https://placehold.co/100x100?text=No+Photo'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-border"
          />
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm rounded-md bg-accent text-white hover:opacity-90 font-semibold transition"
            >
              Edit Profile
            </button>
          ) : null}
        </div>

        {!editing ? (
          <>
            <p className="text-subtext">
              <span className="font-medium text-heading">Email:</span> {user.email}
            </p>
            <p className="text-subtext">
              <span className="font-medium text-heading">Name:</span>{' '}
              {user.displayName || 'Not set'}
            </p>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-subtext mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm text-subtext mb-1">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm rounded-md bg-accent text-white hover:opacity-90 font-semibold transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm rounded-md border border-border text-foreground hover:bg-border/20 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-md bg-red-500 text-white hover:opacity-90 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;