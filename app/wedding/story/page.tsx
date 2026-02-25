'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-navy-50">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">Our Love Story</h1>
            <p className="section-subtitle">How it all began</p>
          </motion.div>

          <div className="space-y-16">
            {/* First Meeting */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/3">
                <div className="bg-sand-200 aspect-square rounded-lg flex items-center justify-center text-5xl">
                  ❤️
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-3xl font-serif text-navy-900 mb-4">The First Meeting</h3>
                <p className="text-navy-600 leading-relaxed mb-2">
                  Our paths first crossed on a beautiful spring day in 2020. Little did we know 
                  that this chance encounter would change our lives forever.
                </p>
                <p className="text-navy-700 font-medium italic">Spring 2020</p>
              </div>
            </motion.div>

            {/* First Date */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse gap-8 items-center"
            >
              <div className="md:w-1/3">
                <div className="bg-navy-200 aspect-square rounded-lg flex items-center justify-center text-5xl">
                  ☕
                </div>
              </div>
              <div className="md:w-2/3 md:text-right">
                <h3 className="text-3xl font-serif text-navy-900 mb-4">The First Date</h3>
                <p className="text-navy-600 leading-relaxed mb-2">
                  A cozy coffee shop, endless conversations, and an undeniable connection. 
                  We talked for hours and knew something special was beginning.
                </p>
                <p className="text-navy-700 font-medium italic">June 2020</p>
              </div>
            </motion.div>

            {/* The Proposal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/3">
                <div className="bg-sand-200 aspect-square rounded-lg flex items-center justify-center text-5xl">
                  💍
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-3xl font-serif text-navy-900 mb-4">The Proposal</h3>
                <p className="text-navy-600 leading-relaxed mb-2">
                  Under the stars, with hearts full of love, Leeroy asked the most important 
                  question. Without hesitation, Lesedi said yes! It was a moment we'll cherish forever.
                </p>
                <p className="text-navy-700 font-medium italic">December 2024</p>
              </div>
            </motion.div>

            {/* The Wedding */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse gap-8 items-center"
            >
              <div className="md:w-1/3">
                <div className="bg-navy-200 aspect-square rounded-lg flex items-center justify-center text-5xl">
                  💑
                </div>
              </div>
              <div className="md:w-2/3 md:text-right">
                <h3 className="text-3xl font-serif text-navy-900 mb-4">The Wedding</h3>
                <p className="text-navy-600 leading-relaxed mb-2">
                  And now, we're ready to begin our forever. We're so grateful to have you 
                  join us as we celebrate our love and commitment to one another.
                </p>
                <p className="text-navy-700 font-medium italic">December 25, 2026</p>
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 card text-center bg-navy-900 text-white"
          >
            <p className="text-2xl font-serif italic mb-4">
              "In all the world, there is no heart for me like yours. 
              In all the world, there is no love for you like mine."
            </p>
            <p className="text-sand-200">— Maya Angelou</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
