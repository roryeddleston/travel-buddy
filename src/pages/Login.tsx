import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      toast.success(`Logged in as ${email}`);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to log in.');
    }
  };

  return (
    <div className="pt-26 pb-20 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-6 mt-6 text-center">Login</h1>
      <form onSubmit={handleLogin} className="bg-surface p-6 rounded-2xl shadow space-y-4">
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
              autoComplete="current-password"
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
          Login
        </button>
        <p className="text-sm text-subtext text-center mt-2">
          Don’t have an account?{' '}
          <a href="/signup" className="text-accent hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;