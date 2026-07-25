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

function TimeUnit({
  value,
  label,
  isVisible,
  delay,
}: {
  value: number;
  label: string;
  isVisible: boolean;
  delay: string;
}) {
  return (
    <div
      className={`flex flex-col items-center v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <span
        className="text-5xl md:text-7xl font-normal tabular-nums"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: '#e94560',
        }}
      >
        {value.toString().padStart(2, '0')}
      </span>
      <span
        className="mt-1 text-[10px] uppercase tracking-[0.3em]"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#6b7a99',
        }}
      >
        {label}
      </span>
      {/* Progress bar under each unit */}
      <div
        className="mt-3 h-[2px] w-12 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(233, 69, 96, 0.15)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            backgroundColor: '#e94560',
            width: `${Math.min(
              (value /
                (label === 'Hari'
                  ? 365
                  : label === 'Jam'
                    ? 24
                    : 60)) *
                100,
              100,
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="w-px h-16 self-start mt-3"
      style={{ backgroundColor: 'rgba(233, 69, 96, 0.2)' }}
    />
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
    <section
      id="countdown"
      className="px-6 py-24 text-center"
      style={{ backgroundColor: '#16213e' }}
      ref={ref}
    >
      <div className="mb-12">
        <h2
          className="text-3xl md:text-4xl tracking-wider uppercase mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#ffffff',
          }}
        >
          Menuju Hari Bahagia
        </h2>
        <div
          className="mx-auto w-12 h-[2px] mb-4"
          style={{ backgroundColor: '#e94560' }}
        />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#6b7a99',
          }}
        >
          Kami tidak sabar untuk merayakannya bersama Anda
        </p>
      </div>

      <div className="mx-auto flex max-w-lg flex-wrap justify-center items-start gap-6 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Hari" isVisible={isVisible} delay="0s" />
        <Divider />
        <TimeUnit value={timeLeft.hours} label="Jam" isVisible={isVisible} delay="0.1s" />
        <Divider />
        <TimeUnit value={timeLeft.minutes} label="Menit" isVisible={isVisible} delay="0.2s" />
        <Divider />
        <TimeUnit value={timeLeft.seconds} label="Detik" isVisible={isVisible} delay="0.3s" />
      </div>
    </section>
  );
}
