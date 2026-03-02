import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Countdown = () => {
  const weddingDate = new Date('2026-07-15T17:00:00').getTime();
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
    <div className="bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-2xl p-4 shadow-xl border border-white/20 w-[115px]">
      <div className="text-5xl font-bold text-white mb-2 tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-white/90 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full py-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-2">
          Faltan solo...
        </h3>
        <p className="text-sm text-gray-600">Para el día más especial</p>
      </motion.div>

      <div className="flex justify-center gap-4 px-10">
        <TimeBlock value={timeLeft.days} label="DÍAS" />
        <TimeBlock value={timeLeft.hours} label="HORAS" />
        <TimeBlock value={timeLeft.minutes} label="MINUTOS" />
      </div>
    </div>
  );
};