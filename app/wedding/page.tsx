'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function WeddingHome() {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    attendingBots: true,
    attendingZim: true,
    hasPlusOne: false,
    plusOneName: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const weddingDate = new Date('2026-12-10T11:00:00');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

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


  return (
    <div className="min-h-screen relative">
      {/* Background Image for Hero Section */}
      <div className="absolute inset-0 h-screen z-0">
        <Image
          src="/wedding/gallery/Leeroy_Lesedi.webp"
          alt="Leeroy and Lesedi"
          fill
          className="object-cover object-[center_40%]"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/60 via-stone-800/50 to-stone-900/60" />
      </div>

      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-pinyon text-white mb-8 drop-shadow-lg">
              Leeroy & Lesedi
            </h1>
           
          </motion.div>
        </div>
      </section>

      {/* Our Wedding Celebrations */}
      <section id="celebrations" className="py-20 px-8" style={{ backgroundColor: '#e4dad2' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm md:text-base font-quattrocento font-bold uppercase tracking-[0.3em] text-stone-800">
            Our Wedding Celebrations
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-8">

          {/* Left - Botswana */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="font-quattrocento font-bold uppercase tracking-[0.25em] text-stone-800 text-sm mb-4">Botswana</p>
            <div className="border-t border-stone-400 mb-6" />
            <h3 className="font-pinyon text-4xl md:text-5xl text-stone-900 mb-4">Ceremony and Reception</h3>
            <p className="font-quattrocento text-stone-600 tracking-wide text-sm mb-6">December 10, 2026</p>
            <div className="border-t border-stone-400 mb-6" />
            <p className="font-quattrocento text-stone-600 text-sm tracking-wide">
              <span className="text-red-600 mr-1">📍</span>
              Caserio Farmhouse, Oodi
            </p>
          </motion.div>

          {/* Center - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96">
              <Image
                src="/wedding/gallery/Leeroy_Lesedi_celebrations.webp"
                alt="Leeroy and Lesedi"
                fill
                className="object-cover object-top grayscale"
              />
            </div>
          </motion.div>

          {/* Right - Zimbabwe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="font-quattrocento font-bold uppercase tracking-[0.25em] text-stone-800 text-sm mb-4">Zimbabwe</p>
            <div className="border-t border-stone-400 mb-6" />
            <h3 className="font-pinyon text-4xl md:text-5xl text-stone-900 mb-4">Bringing of the Bride</h3>
            <p className="font-quattrocento text-stone-600 tracking-wide text-sm mb-6">December 13, 2026</p>
            <div className="border-t border-stone-400 mb-6" />
            <p className="font-quattrocento text-stone-600 text-sm tracking-wide">
              <span className="text-red-600 mr-1">📍</span>
              TBD, Bulawayo
            </p>
          </motion.div>

        </div>
      </section>

      {/* Ceremony & Reception Schedule */}
      <section id="ceremony" className="py-24 px-8" style={{ backgroundColor: '#b7ada0' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-quattrocento font-bold uppercase tracking-[0.3em] text-stone-800">
              Ceremony and Reception
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-40 bg-stone-600" />
              <div className="w-1 h-1 rounded-full bg-stone-600" />
              <div className="h-px w-40 bg-stone-600" />
            </div>
            <p className="font-roboto-mono text-stone-700 text-[10px] leading-relaxed tracking-wide max-w-2xl mx-auto mb-16">
              We will gather for a marriage blessing before God, followed by a reception celebrating our union with family and friends.
            </p>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">11 am &ndash; &nbsp;Ceremony</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">An unplugged ceremony blessing our union</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">11:30 &ndash; Photos &amp; Cocktail Hour</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Light refreshments and time to mingle</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">12:30 &ndash; Toasts &amp; Speeches</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Celebrating love, family, and friendships</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">1 pm &ndash; Lunch is served</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Followed by continued celebration</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bringing of the Bride Schedule */}
      <section id="bringing-of-bride" className="py-24 px-8" style={{ backgroundColor: '#e4dad2' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-quattrocento font-bold uppercase tracking-[0.3em] text-stone-800">
              Bringing of the Bride
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-40 bg-stone-600" />
              <div className="w-1 h-1 rounded-full bg-stone-600" />
              <div className="h-px w-40 bg-stone-600" />
            </div>
            <p className="font-roboto-mono text-stone-700 text-[10px] leading-relaxed tracking-wide max-w-2xl mx-auto mb-16">
              The Bringing of the Bride is a cherished cultural tradition honoring family, heritage, and the union of two families.
            </p>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">11:30 am &ndash; Photos &amp; Cocktail Hour</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Light refreshments and time to mingle</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">12:30 pm &ndash; Toasts &amp; Speeches</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Celebrating love, family, and friendships</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-quattrocento text-stone-800 text-xl mb-1">1 pm &ndash; Lunch is served</p>
                <p className="font-quattrocento text-stone-600 text-sm tracking-wide">Followed by continued celebration</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="relative py-48 px-8 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/wedding/gallery/countdownbackground.webp"
            alt="Leeroy and Lesedi"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-quattrocento font-bold uppercase tracking-[0.3em] text-black text-sm md:text-base mb-16">
              The Countdown Begins
            </p>

            <div className="flex justify-center items-start gap-16 md:gap-24">
              <div className="flex flex-col items-center">
                <span className="font-cormorant text-black text-6xl md:text-7xl font-light leading-none">
                  {String(countdown.days)}
                </span>
                <span className="font-cormorant text-black text-lg md:text-xl mt-6 tracking-wide">days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-cormorant text-black text-6xl md:text-7xl font-light leading-none">
                  {String(countdown.hours)}
                </span>
                <span className="font-cormorant text-black text-lg md:text-xl mt-6 tracking-wide">hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-cormorant text-black text-6xl md:text-7xl font-light leading-none">
                  {String(countdown.minutes)}
                </span>
                <span className="font-cormorant text-black text-lg md:text-xl mt-6 tracking-wide">minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gifts Section */}
      <section id="gifts" className="py-24 px-8" style={{ backgroundColor: '#e4dad2' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">

          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative w-60 h-80 md:w-72 md:h-96">
              <Image
                src="/wedding/gallery/gifts.jpg"
                alt="Gifts"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h3 className="font-quattrocento text-stone-900 text-2xl md:text-3xl leading-snug mb-4">
              Your presence is truly the best gift we could ask for.
            </h3>
            <p className="font-roboto-mono text-stone-600 text-[10px] leading-relaxed mb-6">
              But if you feel called to give a little something, you can send cash gifts to
            </p>

            <div className="space-y-4 font-roboto-mono text-[10px] text-stone-700 leading-relaxed">
              <div>
                <p className="font-bold text-stone-900">Botswana</p>
                <p>Lesedi Meswele</p>
                <p>BBS</p>
                <p>Account#: 0100003142177</p>
                <p>Branch code: BW0010002</p>
              </div>
              <div>
                <p className="font-bold text-stone-900">Canada (e-transfer)</p>
                <p>lesedimeswele@gmail.com</p>
                <p>leeroyphili@gmail.com</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-32 px-4" style={{ backgroundColor: '#b7ada0' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-quattrocento font-bold uppercase tracking-[0.2em] text-stone-900 text-6xl md:text-7xl mb-16">RSVP</h2>
            <p className="font-roboto-mono text-stone-700 text-[10px] tracking-wide mb-16">
              Kindly reply by November 25, 2026
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-stone-700 hover:bg-stone-800 text-white px-16 py-5 rounded-full transition-colors duration-300 font-quattrocento text-lg tracking-wide"
            >
              RSVP NOW
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-new" className="py-24 px-12 md:px-24" style={{ backgroundColor: '#e4dad2' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-cormorant text-6xl md:text-7xl text-stone-800 mb-12 text-center">FAQs</h2>

            <div className="space-y-8">
              <div>
                <p className="font-roboto-mono font-bold text-[11px] text-stone-900 mb-1">Is there a dress code?</p>
                <p className="font-roboto-mono text-[11px] text-stone-700 leading-relaxed text-justify">There is no strict dress code; we want you to feel comfortable and confident. Both the blessing ceremony and reception will take place outdoors, so please dress accordingly. December can be extremely hot, but it can also bring rain and cooler moments, so we recommend light, breathable fabrics and bringing a layer just in case.</p>
              </div>

              <div>
                <p className="font-roboto-mono font-bold text-[11px] text-stone-900 mb-1">Can i bring a plus one?</p>
                <p className="font-roboto-mono text-[11px] text-stone-700 leading-relaxed text-justify">Because of limited capacity, we&apos;re only inviting the guest(s) listed on your invitation. If you would like to request a plus-one, please indicate it in the RSVP section, and we will do our best to accommodate, space permitting.</p>
              </div>

              <div>
                <p className="font-roboto-mono font-bold text-[11px] text-stone-900 mb-1">Can I take pictures during the ceremony?</p>
                <p className="font-roboto-mono text-[11px] text-stone-700 leading-relaxed text-justify">We kindly ask for an unplugged ceremony. Please keep your phones away during the blessing.</p>
              </div>

              <div>
                <p className="font-roboto-mono font-bold text-[11px] text-stone-900 mb-1">Where can I book accommodation in Botswana or Zimbabwe?</p>
                <p className="font-roboto-mono text-[11px] text-stone-700 leading-relaxed text-justify">For guests travelling from out of town, we&apos;ve put together a detailed guide with recommended accommodation options in Zimbabwe and Botswana, along with restaurant suggestions and a mini travel guide to help you plan your stay. Please click the <a href="#" className="underline font-bold">link</a> below to access the full guide.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* RSVP Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitted && setModalOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-stone-200 px-8 py-6 flex justify-between items-center">
                <h3 className="text-3xl font-quattrocento text-stone-900">RSVP</h3>
                {!submitted && (
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-stone-500 hover:text-stone-700 text-2xl"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-6">✨</div>
                    <h3 className="text-3xl font-serif text-stone-900 mb-4">
                      Thank You!
                    </h3>
                    <p className="text-lg text-stone-700 mb-4">
                      Your RSVP has been received successfully.
                    </p>
                    {(formData.attendingBots || formData.attendingZim) ? (
                      <div className="text-stone-600 mb-8 space-y-2">
                        {formData.attendingBots && <p>✨ We're excited to celebrate with you at the Traditional & White Wedding in South Africa!</p>}
                        {formData.attendingZim && <p>✨ We're excited to celebrate with you at the UK Reception!</p>}
                        {formData.hasPlusOne && <p>Looking forward to meeting your guest!</p>}
                      </div>
                    ) : (
                      <p className="text-stone-600 mb-8">
                        We'll miss you at our special celebrations, but we understand.
                      </p>
                    )}
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          guestName: '',
                          email: '',
                          attendingBots: true,
                          attendingZim: true,
                          hasPlusOne: false,
                          plusOneName: '',
                          message: '',
                        });
                      }}
                      className="bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-none transition-colors font-medium"
                    >
                      Submit Another RSVP
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setModalOpen(false);
                        setFormData({
                          guestName: '',
                          email: '',
                          attendingBots: true,
                          attendingZim: true,
                          hasPlusOne: false,
                          plusOneName: '',
                          message: '',
                        });
                      }}
                      className="ml-4 bg-stone-200 hover:bg-stone-300 text-stone-800 px-8 py-3 rounded-none transition-colors font-medium"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="guestName" className="block text-sm font-medium text-stone-800 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="guestName"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-none text-stone-900 placeholder-stone-400 focus:border-orange-300 focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-stone-800 mb-3">
                        Which celebration(s) will you attend? *
                      </label>
                      
                      {/* Botswana Wedding */}
                      <div className="bg-stone-50 p-4 rounded-none border border-stone-200">
                        <p className="font-medium text-stone-800 mb-3">Traditional & White Wedding - Botswana</p>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="attendingBots"
                              checked={formData.attendingBots === true}
                              onChange={() => setFormData(prev => ({ ...prev, attendingBots: true }))}
                              className="mr-2"
                            />
                            <span className="text-stone-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="attendingBots"
                              checked={formData.attendingBots === false}
                              onChange={() => setFormData(prev => ({ ...prev, attendingBots: false }))}
                              className="mr-2"
                            />
                            <span className="text-stone-700">No</span>
                          </label>
                        </div>
                      </div>

                      {/* Zimbabwe Reception */}
                      <div className="bg-stone-50 p-4 rounded-none border border-stone-200">
                        <p className="font-medium text-stone-800 mb-3">Celebration Reception - Zimbabwe</p>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="attendingZim"
                              checked={formData.attendingZim === true}
                              onChange={() => setFormData(prev => ({ ...prev, attendingZim: true }))}
                              className="mr-2"
                            />
                            <span className="text-stone-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="attendinZim"
                              checked={formData.attendingZim === false}
                              onChange={() => setFormData(prev => ({ ...prev, attendingZim: false }))}
                              className="mr-2"
                            />
                            <span className="text-stone-700">No</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      If you would like to request a plus-one, please indicate in the comment section below and we will do our best to accommodate your request and get back to you.
                    </p>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-stone-800 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-none text-stone-900 placeholder-stone-400 focus:border-orange-300 focus:outline-none transition-colors resize-none"
                        placeholder="Share your wishes or any dietary requirements..."
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium uppercase tracking-wider"
                      >
                        {loading ? 'Submitting...' : 'Submit RSVP'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-800 py-4 rounded-none transition-colors duration-300 font-medium uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
