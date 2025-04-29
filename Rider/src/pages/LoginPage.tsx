import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path based on your project structure

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password); // Call the login function from AuthContext
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      alert((error as Error).message); // Show an error message if login fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Uber Eats Driver</h1>
        <p className="text-gray-400">Sign in to start delivering</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto w-full">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-green-500 text-black font-medium rounded-lg flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className="mt-6 text-center">
        <button className="text-green-500 text-sm">Forgot password?</button>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')} // Navigate to the registration page
            className="text-green-500 font-medium"
          >
            Sign up to deliver
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;