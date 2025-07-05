import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created!');
      navigate('/'); // redirect to home
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Signup failed.');
    }
  };

  return (
    <div className="pt-26 pb-20 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-6 mt-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignup} className="bg-surface p-6 rounded-2xl shadow space-y-4">
        <div>
          <label className="block text-sm mb-1 text-subtext">Email</label>
          <input
            type="email"
            autoComplete="email"
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-subtext">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              autoComplete="new-password"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute inset-y-0 right-2 px-2 flex items-center text-subtext"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-accent text-white hover:opacity-90 transition"
        >
          Sign Up
        </button>
        <p className="text-sm text-subtext text-center mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;