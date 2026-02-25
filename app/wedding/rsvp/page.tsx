'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    attending: true,
    hasPlusOne: false,
    plusOneName: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit RSVP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-navy-50">
        <Navigation />
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card text-center"
            >
              <div className="text-6xl mb-6">✨</div>
              <h2 className="text-4xl font-serif text-navy-900 mb-4">
                Thank You!
              </h2>
              <p className="text-xl text-navy-700 mb-4">
                Your RSVP has been received successfully.
              </p>
              {formData.attending ? (
                <p className="text-navy-600 mb-8">
                  We're so excited to celebrate with you{formData.hasPlusOne ? ' and your guest' : ''}!
                </p>
              ) : (
                <p className="text-navy-600 mb-8">
                  We'll miss you at our special day, but we understand.
                </p>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      guestName: '',
                      email: '',
                      attending: true,
                      hasPlusOne: false,
                      plusOneName: '',
                      message: '',
                    });
                  }}
                  className="btn-secondary"
                >
                  Submit Another RSVP
                </button>
                <a href="/wedding" className="btn-primary">
                  Back to Home
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-navy-50">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="section-title">RSVP</h1>
            <p className="section-subtitle">We hope you can join us!</p>
            <p className="text-navy-600">Please respond by November 25, 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Name */}
              <div>
                <label htmlFor="guestName" className="block text-sm font-medium text-navy-700 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Attending */}
              <div className="bg-sand-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-navy-700 mb-4">Will you be attending? *</p>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === true}
                      onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
                      className="w-4 h-4 text-navy-600 focus:ring-navy-600 mr-2"
                      required
                    />
                    <span className="text-navy-700">Joyfully accepts</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === false}
                      onChange={() => setFormData(prev => ({ ...prev, attending: false, hasPlusOne: false, plusOneName: '' }))}
                      className="w-4 h-4 text-navy-600 focus:ring-navy-600 mr-2"
                      required
                    />
                    <span className="text-navy-700">Regretfully declines</span>
                  </label>
                </div>
              </div>

              {/* Plus One Section - Only show if attending */}
              {formData.attending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Has Plus One Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="hasPlusOne"
                      name="hasPlusOne"
                      checked={formData.hasPlusOne}
                      onChange={handleChange}
                      className="w-5 h-5 text-navy-600 focus:ring-navy-600 rounded mt-1 mr-3"
                    />
                    <label htmlFor="hasPlusOne" className="text-navy-700 cursor-pointer">
                      I will be bringing a plus one
                    </label>
                  </div>

                  {/* Plus One Name - Only show if hasPlusOne is checked */}
                  {formData.hasPlusOne && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="plusOneName" className="block text-sm font-medium text-navy-700 mb-2">
                        Plus One's Full Name *
                      </label>
                      <input
                        type="text"
                        id="plusOneName"
                        name="plusOneName"
                        value={formData.plusOneName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your guest's full name"
                        required={formData.hasPlusOne}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                  Message to the Couple (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Share your wishes or let us know about dietary restrictions..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
              >
                {loading ? 'Submitting...' : 'Submit RSVP'}
              </button>

              <p className="text-center text-sm text-navy-600">
                * Required fields
              </p>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-center text-navy-600"
          >
            <p>Need to make changes to your RSVP?</p>
            <p className="mt-2">
              Contact us at{' '}
              <a 
                href="mailto:lesediandleeroy@wedding.com" 
                className="text-navy-700 hover:text-navy-900 underline"
              >
                lesediandleeroy@wedding.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
