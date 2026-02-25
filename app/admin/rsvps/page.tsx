'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RSVP {
  _id: string;
  guestName: string;
  email?: string;
  attendingSA: boolean;
  attendingUK: boolean;
  hasPlusOne: boolean;
  plusOneName?: string;
  message?: string;
  createdAt: string;
}

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'sa' | 'uk' | 'both' | 'neither'>('all');

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch('/api/rsvp');
      const data = await response.json();

      if (response.ok) {
        setRsvps(data.rsvps);
      } else {
        setError('Failed to fetch RSVPs');
      }
    } catch (err) {
      setError('An error occurred while fetching RSVPs');
    } finally {
      setLoading(false);
    }
  };

  const filteredRSVPs = rsvps.filter(rsvp => {
    if (filter === 'sa') return rsvp.attendingSA;
    if (filter === 'uk') return rsvp.attendingUK;
    if (filter === 'both') return rsvp.attendingSA && rsvp.attendingUK;
    if (filter === 'neither') return !rsvp.attendingSA && !rsvp.attendingUK;
    return true;
  });

  const attendingSA = rsvps.filter(r => r.attendingSA).length;
  const attendingUK = rsvps.filter(r => r.attendingUK).length;
  const attendingBoth = rsvps.filter(r => r.attendingSA && r.attendingUK).length;
  const totalGuestsSA = rsvps.reduce((acc, r) => {
    if (!r.attendingSA) return acc;
    return acc + 1 + (r.hasPlusOne ? 1 : 0);
  }, 0);
  const totalGuestsUK = rsvps.reduce((acc, r) => {
    if (!r.attendingUK) return acc;
    return acc + 1 + (r.hasPlusOne ? 1 : 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-white to-navy-50">
        <div className="text-navy-600 text-xl">Loading RSVPs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-navy-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif text-navy-900 text-center mb-4">
            RSVP Dashboard
          </h1>
          <p className="text-center text-navy-600 mb-8">Wedding Administration</p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center bg-white">
              <p className="text-3xl font-bold text-navy-900">{rsvps.length}</p>
              <p className="text-navy-600">Total Responses</p>
            </div>
            <div className="card text-center bg-green-50 border-green-200">
              <p className="text-3xl font-bold text-green-700">{attendingSA}</p>
              <p className="text-green-600">SA Wedding</p>
              <p className="text-xs text-green-600 mt-1">{totalGuestsSA} guests</p>
            </div>
            <div className="card text-center bg-blue-50 border-blue-200">
              <p className="text-3xl font-bold text-blue-700">{attendingUK}</p>
              <p className="text-blue-600">UK Reception</p>
              <p className="text-xs text-blue-600 mt-1">{totalGuestsUK} guests</p>
            </div>
            <div className="card text-center bg-purple-50 border-purple-200">
              <p className="text-3xl font-bold text-purple-700">{attendingBoth}</p>
              <p className="text-purple-600">Both Events</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-navy-800 text-white'
                  : 'bg-white text-navy-700 hover:bg-sand-100'
              }`}
            >
              All ({rsvps.length})
            </button>
            <button
              onClick={() => setFilter('sa')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'sa'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-navy-700 hover:bg-sand-100'
              }`}
            >
              SA Wedding ({attendingSA})
            </button>
            <button
              onClick={() => setFilter('uk')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'uk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-navy-700 hover:bg-sand-100'
              }`}
            >
              UK Reception ({attendingUK})
            </button>
            <button
              onClick={() => setFilter('both')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'both'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-navy-700 hover:bg-sand-100'
              }`}
            >
              Both ({attendingBoth})
            </button>
            <button
              onClick={() => setFilter('neither')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'neither'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-navy-700 hover:bg-sand-100'
              }`}
            >
              Neither
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* RSVPs List */}
          <div className="card overflow-hidden">
            {filteredRSVPs.length === 0 ? (
              <div className="text-center py-12 text-navy-600">
                No RSVPs found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sand-100 border-b border-sand-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">Guest Name</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">SA Wedding</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">UK Reception</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">Plus One</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">Message</th>
                      <th className="px-4 py-3 text-left text-navy-900 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRSVPs.map((rsvp, index) => (
                      <tr
                        key={rsvp._id}
                        className={`border-b border-sand-100 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-sand-50'
                        }`}
                      >
                        <td className="px-4 py-3 text-navy-800 font-medium">
                          {rsvp.guestName}
                        </td>
                        <td className="px-4 py-3 text-navy-600">
                          {rsvp.email || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              rsvp.attendingSA
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {rsvp.attendingSA ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              rsvp.attendingUK
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {rsvp.attendingUK ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-navy-600">
                          {rsvp.hasPlusOne ? (
                            <span>
                              ✓ {rsvp.plusOneName}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-4 py-3 text-navy-600 text-sm max-w-xs truncate">
                          {rsvp.message || '—'}
                        </td>
                        <td className="px-4 py-3 text-navy-600 text-sm">
                          {new Date(rsvp.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <div className="text-center mt-6">
            <button
              onClick={fetchRSVPs}
              className="btn-secondary"
            >
              🔄 Refresh Data
            </button>
          </div>

          {/* Back to Site */}
          <div className="text-center mt-8">
            <a href="/" className="text-navy-600 hover:text-navy-900 underline">
              ← Back to Wedding Site
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
