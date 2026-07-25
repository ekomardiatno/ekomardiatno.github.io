import { useEffect, useMemo, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import useScrollReveal from './useScrollReveal';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const RING_SIZE = 90;
const STROKE_WIDTH = 4;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CountdownRing({
  value,
  max,
  label,
  delay,
  isVisible,
}: {
  value: number;
  max: number;
  label: string;
  delay: string;
  isVisible: boolean;
}) {
  const progress = Math.min(value / max, 1);
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      className={`flex flex-col items-center reveal reveal-scale ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          className="-rotate-90"
        >
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(183, 110, 121, 0.15)"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#b76e79"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl md:text-3xl font-semibold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2d2020',
            }}
          >
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span
        className="mt-2 text-xs uppercase tracking-[0.15em]"
        style={{ color: '#9e8e8e' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const mainEvent = useMemo(() => {
    if (!data || data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) || data.events[0];
  }, [data]);

  const weddingDate = useMemo(() => {
    let date = new Date(new Date().getTime() + 100 * 24 * 60 * 60 * 1000);
    if (mainEvent) {
      const parts = mainEvent.startTime.split(':').map((v) => Number(v.trim()));
      date = new Date(
        new Date(mainEvent.date).setHours(parts[0], parts[1], parts[2], 0),
      );
    }
    return date;
  }, [mainEvent]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(weddingDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!mainEvent) return null;

  return (
    <section id="countdown" className="px-6 py-20 text-center" ref={ref}>
      <div className="mb-12">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Menuju Hari Bahagia
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Kami tidak sabar untuk merayakannya bersama Anda
        </p>
      </div>

      <div className="mx-auto flex max-w-md flex-wrap justify-center items-start gap-6 md:gap-10">
        <CountdownRing value={timeLeft.days} max={365} label="Hari" delay="0s" isVisible={isVisible} />
        <CountdownRing value={timeLeft.hours} max={24} label="Jam" delay="0.1s" isVisible={isVisible} />
        <CountdownRing value={timeLeft.minutes} max={60} label="Menit" delay="0.2s" isVisible={isVisible} />
        <CountdownRing value={timeLeft.seconds} max={60} label="Detik" delay="0.3s" isVisible={isVisible} />
      </div>
    </section>
  );
}
