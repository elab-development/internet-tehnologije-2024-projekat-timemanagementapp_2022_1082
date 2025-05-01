'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password123' || email === 'admin' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/home');
    } else {
      setError('Pogrešan email ili lozinka.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 rounded-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Prijavite se</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border text-gray-800 border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border text-gray-800 border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 mt-6 rounded hover:bg-blue-600 hover:cursor-pointer"
        >
          Prijavi se
        </button>
        <p className="mt-4 text-gray-800 text-center">
          Nemate nalog?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;