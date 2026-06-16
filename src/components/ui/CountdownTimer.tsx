"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = { hours: number; minutes: number; seconds: number };

function getTimeLeft(endDate: Date): TimeLeft {
  const diff = Math.max(0, endDate.getTime() - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer() {
  const [endDate] = useState(() => {
    const end = new Date();
    end.setHours(end.getHours() + 48);
    end.setMinutes(0, 0, 0);
    return end;
  });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(endDate)), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const units: [string, keyof TimeLeft][] = [
    [pad(timeLeft.hours), "hours"],
    [pad(timeLeft.minutes), "minutes"],
    [pad(timeLeft.seconds), "seconds"],
  ];

  const labels = ["Hours", "Minutes", "Seconds"];

  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      {units.map(([value, key], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="border border-line bg-background/45 p-6 transition hover:-translate-y-1 hover:border-accent"
        >
          <motion.b
            key={value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block font-serif text-4xl tabular-nums"
          >
            {value}
          </motion.b>
          <p className="tracked-luxury mt-2 text-[10px]">{labels[i]}</p>
        </motion.div>
      ))}
    </div>
  );
}
