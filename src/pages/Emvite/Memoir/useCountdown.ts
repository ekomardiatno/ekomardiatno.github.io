import { useEffect, useState } from 'react';

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function useCountdown(targetDate: Date): CountdownValues {
  const calculate = (): CountdownValues => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState(calculate);

  useEffect(() => {
    const id = setInterval(() => setCountdown(calculate()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime()]);

  return countdown;
}
