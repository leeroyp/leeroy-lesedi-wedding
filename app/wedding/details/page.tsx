'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function Details() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-navy-50">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">Wedding Details</h1>
            <p className="section-subtitle">Everything you need to know</p>
          </motion.div>

          {/* Ceremony Details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card mb-8"
          >
            <h2 className="text-3xl font-serif text-navy-900 mb-6">Ceremony</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Date & Time</h3>
                <p className="text-navy-600 mb-2">Saturday, December 25, 2026</p>
                <p className="text-navy-600">4:00 PM - 5:00 PM</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Location</h3>
                <p className="text-navy-600 mb-2">The Grand Venue</p>
                <p className="text-navy-600">123 Wedding Lane</p>
                <p className="text-navy-600">Johannesburg, Gauteng</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-navy-700 hover:text-navy-900 underline mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Reception Details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card mb-8"
          >
            <h2 className="text-3xl font-serif text-navy-900 mb-6">Reception</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Date & Time</h3>
                <p className="text-navy-600 mb-2">Saturday, December 25, 2026</p>
                <p className="text-navy-600">6:00 PM - 12:00 AM</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Location</h3>
                <p className="text-navy-600 mb-2">The Grand Venue Ballroom</p>
                <p className="text-navy-600">Same venue as ceremony</p>
                <p className="text-navy-600 mt-2 text-sm">Cocktail hour, dinner, and dancing</p>
              </div>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card mb-8"
          >
            <h2 className="text-3xl font-serif text-navy-900 mb-6">Dress Code</h2>
            <div className="prose max-w-none">
              <p className="text-navy-600 mb-4">
                <span className="font-semibold text-navy-800">Formal Attire</span> - We kindly request that our guests dress elegantly for this special occasion.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold text-navy-800 mb-2">For Gentlemen</h3>
                  <ul className="text-navy-600 space-y-1">
                    <li>• Dark suits or tuxedos</li>
                    <li>• Dress shirts and ties</li>
                    <li>• Dress shoes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-800 mb-2">For Ladies</h3>
                  <ul className="text-navy-600 space-y-1">
                    <li>• Formal dresses or gowns</li>
                    <li>• Elegant evening wear</li>
                    <li>• Dress shoes or heels</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Accommodations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card mb-8"
          >
            <h2 className="text-3xl font-serif text-navy-900 mb-6">Accommodations</h2>
            <p className="text-navy-600 mb-4">
              For your convenience, we've reserved room blocks at the following hotels:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sand-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-navy-800 mb-2">The Grand Hotel</h3>
                <p className="text-navy-600 text-sm mb-2">5 minutes from venue</p>
                <p className="text-navy-600 text-sm mb-2">Reserve by: November 25, 2026</p>
                <p className="text-navy-600 text-sm">Mention "Lesedi & Leeroy Wedding"</p>
              </div>
              <div className="bg-sand-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Comfort Inn & Suites</h3>
                <p className="text-navy-600 text-sm mb-2">10 minutes from venue</p>
                <p className="text-navy-600 text-sm mb-2">Reserve by: November 25, 2026</p>
                <p className="text-navy-600 text-sm">Mention "Lesedi & Leeroy Wedding"</p>
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card"
          >
            <h2 className="text-3xl font-serif text-navy-900 mb-6">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">📸 Photography</h3>
                <p className="text-navy-600">
                  An unplugged ceremony is requested. Please enjoy the moment and let our 
                  professional photographers capture the memories.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">🎁 Registry</h3>
                <p className="text-navy-600">
                  Your presence is the greatest gift. If you wish to honor us with a gift, 
                  a monetary contribution towards our honeymoon would be appreciated.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">👶 Children</h3>
                <p className="text-navy-600">
                  While we love your little ones, this will be an adults-only celebration. 
                  We hope this allows you to relax and enjoy the evening.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">📞 Contact</h3>
                <p className="text-navy-600">
                  For questions or concerns, please contact us at: 
                  <a href="mailto:lesediandleeroy@wedding.com" className="text-navy-700 hover:text-navy-900 underline ml-1">
                    lesediandleeroy@wedding.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
