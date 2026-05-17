import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col">
        {/* Logo/Brand (optional but good for context) */}
        <div className="text-center mb-6">
          <span className="text-2xl font-black text-black">Hintro</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@email.com"
                className="pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm placeholder-gray-400 transition-all text-gray-900"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-4 pr-12 py-3.5 border border-gray-200 rounded-xl w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm placeholder-gray-400 transition-all text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-xl py-3.5 font-semibold mt-6 hover:bg-gray-800 transition-colors text-sm shadow-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
