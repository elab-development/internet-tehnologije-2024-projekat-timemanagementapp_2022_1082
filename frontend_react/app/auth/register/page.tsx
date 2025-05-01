'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, password }));
      router.push('/auth/login');
    } else {
      setError('Popunite sva polja');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrujte se</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 mt-6 rounded hover:bg-blue-600"
        >
          Registrujte se
        </button>
        <p className="mt-4 text-center text-gray-800">
          Već imate nalog?{' '}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Prijavite se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;