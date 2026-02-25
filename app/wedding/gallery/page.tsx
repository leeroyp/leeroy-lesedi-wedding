'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function Gallery() {
  const images = [
    { id: 1, emoji: '💑', caption: 'Our First Photo Together' },
    { id: 2, emoji: '🌅', caption: 'Sunset Date' },
    { id: 3, emoji: '🎄', caption: 'Holiday Memories' },
    { id: 4, emoji: '🌊', caption: 'Beach Vacation' },
    { id: 5, emoji: '🏔️', caption: 'Mountain Adventure' },
    { id: 6, emoji: '🎭', caption: 'Date Night' },
    { id: 7, emoji: '🍷', caption: 'Dinner & Wine' },
    { id: 8, emoji: '🌹', caption: 'Anniversary' },
    { id: 9, emoji: '💍', caption: 'The Proposal' },
  ];

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
            <h1 className="section-title">Our Gallery</h1>
            <p className="section-subtitle">Moments we've shared together</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-sand-100 to-navy-100 rounded-lg flex items-center justify-center text-6xl mb-4">
                  {image.emoji}
                </div>
                <p className="text-center text-navy-700 font-medium">{image.caption}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 card text-center bg-navy-50"
          >
            <p className="text-navy-700 text-lg">
              📷 More photos to come after the big day! 
            </p>
            <p className="text-navy-600 mt-2">
              We can't wait to create new memories with all of you.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
