import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Countdown = () => {
  const weddingDate = new Date('2026-06-15T17:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl border border-white/20 flex-1">
      <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-1 sm:mb-2 tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white/90 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full py-8 sm:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-2">
          Faltan solo...
        </h3>
        <p className="text-sm sm:text-base text-gray-600">Para el día más especial</p>
      </motion.div>

      <div className="flex gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
        <TimeBlock value={timeLeft.days} label="Días" />
        <TimeBlock value={timeLeft.hours} label="Horas" />
        <TimeBlock value={timeLeft.minutes} label="Minutos" />
      </div>
    </div>
  );
};