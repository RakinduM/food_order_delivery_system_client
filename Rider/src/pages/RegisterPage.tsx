import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path based on your project structure

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [nicImage, setNicImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth(); // Use the register function from AuthContext

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNicImage(e.target.files[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('number', number);
      if (nicImage) {
        formData.append('nicImage', nicImage);
      }
      formData.append('isAvailable', 'true'); // Default value
      formData.append('isApproved', 'false'); // Default value

      await register(formData); // Call the register function from AuthContext
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to the login page on successful registration
    } catch (error) {
      alert((error as Error).message); // Show an error message if registration fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Uber Eats Driver</h1>
        <p className="text-gray-400">Sign up to start delivering</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto w-full">
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="email@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            id="number"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="nicImage" className="block text-sm font-medium text-gray-300 mb-1">
            NIC Image
          </label>
          <input
            id="nicImage"
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
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
            'Sign Up'
          )}
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-green-500 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;