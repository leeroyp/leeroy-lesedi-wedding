'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: searchTerm.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication in session storage
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('guestName', `${data.guest.firstName} ${data.guest.lastName}`);
        
        // Redirect to wedding site
        router.push('/wedding');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden" style={{ backgroundColor: '#c2bab1' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full text-center"
      >
        {/* Names in elegant script style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-pinyon text-stone-800 mb-4 leading-tight">
            Lesedi
          </h1>
          <p className="text-2xl md:text-3xl text-stone-600 font-light tracking-widest my-6">
            &
          </p>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-pinyon text-stone-800 mb-8 leading-tight">
            Leeroy
          </h1>
        </motion.div>

        {/* Invitation text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl text-stone-700 tracking-wider uppercase mb-8 font-light">
            Invite You To Their Wedding
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-stone-400 w-16" />
            <div className="mx-4 text-stone-700 text-2xl">✦</div>
            <div className="h-px bg-stone-400 w-16" />
          </div>
        </motion.div>

        {/* Single input field */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-center text-lg border-2 border-stone-700 rounded-lg focus:border-stone-800 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm placeholder:text-stone-400"
              placeholder="Enter your name or email"
              required
            />
            <p className="text-sm text-stone-600 mt-3 font-light">
              Please enter your full name or email address 
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-700 hover:bg-stone-800 text-white py-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-wider uppercase text-sm"
          >
            {loading ? 'Verifying...' : 'View Invitation'}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-sm text-stone-600 mt-8 font-light"
        >
          Only invited guests can access this invitation
        </motion.p>
      </motion.div>
    </div>
  );
}
