import { useMemo } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import moment from 'moment';

const petals = [
  { left: '10%', delay: '0s', duration: '8s', size: 12 },
  { left: '25%', delay: '2s', duration: '10s', size: 10 },
  { left: '45%', delay: '4s', duration: '9s', size: 14 },
  { left: '65%', delay: '1s', duration: '11s', size: 10 },
  { left: '80%', delay: '3s', duration: '8.5s', size: 12 },
  { left: '90%', delay: '5s', duration: '10s', size: 8 },
];

export default function HeroSection() {
  const { data } = useEmvite();

  const mainEvent = useMemo(() => {
    if (!data) return null;
    if (data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) ?? data.events[0];
  }, [data]);

  return (
    <div
      className="relative flex-1 flex flex-col justify-end overflow-hidden bg-cover bg-center bg-hero-enchanted"
    >
      <div className="overlay-enchanted-bg absolute inset-0" />

      {/* Floating petals */}
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size * 1.3,
          }}
        />
      ))}

      {data && (
        <div className="relative z-10 px-8 pb-16 md:pb-20 text-center enchanted-hero-enter">
          {data.guest && (
            <div
              className="inline-block mb-8 px-5 py-1.5 rounded-full border"
              style={{ borderColor: 'rgba(183, 110, 121, 0.4)' }}
            >
              <p className="text-sm" style={{ color: '#6b5b5b' }}>
                Kepada Yth. {data.guest.name}
              </p>
            </div>
          )}

          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#9e8e8e',
            }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-5xl md:text-7xl leading-tight"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#b76e79',
            }}
          >
            {data.wedding.groomNickname || data.wedding.groomName}
            <span
              className="block text-3xl md:text-4xl my-2"
              style={{ color: '#c9a96e' }}
            >
              &amp;
            </span>
            {data.wedding.brideNickname || data.wedding.brideName}
          </h1>

          {mainEvent && (
            <p
              className="mt-6 text-sm tracking-[0.25em] uppercase"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#6b5b5b',
              }}
            >
              {moment(mainEvent.date).format('ddd, DD MMM Y')}
            </p>
          )}

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm tracking-wide transition cursor-pointer"
              style={{
                backgroundColor: '#b76e79',
                color: '#fdf8f4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#9c5c66';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#b76e79';
              }}
              onClick={() => {
                document
                  .getElementById(mainEvent ? 'countdown' : 'couple')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Buka Undangan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
