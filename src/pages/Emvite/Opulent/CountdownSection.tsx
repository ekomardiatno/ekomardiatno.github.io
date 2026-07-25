import { useEffect, useMemo, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import useScrollReveal from './useScrollReveal';
import useCountUp from './useCountUp';
import { OrnamentDivider } from './Ornaments';

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
  const countedValue = useCountUp(value, 1500, isVisible);

  return (
    <div
      className={`flex flex-col items-center op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      {/* Ornate ring around number */}
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
        style={{ border: '1px solid rgba(184, 134, 11, 0.3)' }}
      >
        {/* Inner border */}
        <div
          className="absolute inset-1.5"
          style={{ border: '1px solid rgba(184, 134, 11, 0.15)' }}
        />
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-3 h-3 border-t border-l" style={{ borderColor: '#b8860b' }} />
        <div className="absolute -top-px -right-px w-3 h-3 border-t border-r" style={{ borderColor: '#b8860b' }} />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l" style={{ borderColor: '#b8860b' }} />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r" style={{ borderColor: '#b8860b' }} />

        <span
          className="text-3xl md:text-4xl tabular-nums"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#b8860b',
          }}
        >
          {countedValue.toString().padStart(2, '0')}
        </span>
      </div>
      <span
        className="mt-3 text-[10px] uppercase tracking-[0.3em]"
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          color: '#8a8a8a',
          fontWeight: 300,
        }}
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
    <section id="countdown" className="px-6 py-24 text-center opulent-marble" ref={ref}>
      <div className="mb-12">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Menuju Hari Bahagia
        </h2>
        <OrnamentDivider className="mb-4" />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          Kami tidak sabar untuk merayakannya bersama Anda
        </p>
      </div>

      <div className="mx-auto flex max-w-lg flex-wrap justify-center items-start gap-5 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Hari" isVisible={isVisible} delay="0s" />
        <TimeUnit value={timeLeft.hours} label="Jam" isVisible={isVisible} delay="0.15s" />
        <TimeUnit value={timeLeft.minutes} label="Menit" isVisible={isVisible} delay="0.3s" />
        <TimeUnit value={timeLeft.seconds} label="Detik" isVisible={isVisible} delay="0.45s" />
      </div>
    </section>
  );
}
