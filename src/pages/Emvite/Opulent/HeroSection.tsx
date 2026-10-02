import { useMemo } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { OrnamentDivider, CornerOrnament } from './Ornaments';
import moment from 'moment';

export default function HeroSection() {
  const { data } = useEmvite();

  const mainEvent = useMemo(() => {
    if (!data) return null;
    if (data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) ?? data.events[0];
  }, [data]);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden bg-cover bg-center bg-hero-opulent"
    >
      <div className="overlay-opulent absolute inset-0" />

      {/* Ornate border frame on hero */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none z-20">
        <div
          className="w-full h-full"
          style={{ border: '1px solid rgba(184, 134, 11, 0.2)' }}
        />
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />
      </div>

      {data && (
        <div className="relative z-10 px-10 pb-20 md:pb-24 text-center op-hero-enter">
          {data.guest && (
            <div
              className="inline-block mb-6 px-6 py-1.5"
              style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#d4af37',
                }}
              >
                Kepada Yth. {data.guest.name}
              </p>
            </div>
          )}

          <p
            className="text-xs tracking-[0.5em] uppercase mb-6"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              color: 'rgba(212, 175, 55, 0.7)',
              fontWeight: 300,
            }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-5xl md:text-7xl leading-tight opulent-shimmer"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {data.wedding.groomNickname || data.wedding.groomName}
          </h1>

          <OrnamentDivider className="my-4" />

          <h1
            className="text-5xl md:text-7xl leading-tight opulent-shimmer"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {data.wedding.brideNickname || data.wedding.brideName}
          </h1>

          {mainEvent && (
            <p
              className="mt-8 text-sm tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                color: 'rgba(212, 175, 55, 0.8)',
                fontWeight: 300,
              }}
            >
              {moment(mainEvent.date).format('ddd, DD MMMM YYYY')}
            </p>
          )}

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center justify-center px-10 py-3.5 text-xs uppercase tracking-[0.3em] transition cursor-pointer pulse-glow"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                border: '1px solid #b8860b',
                color: '#d4af37',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b8860b';
                e.currentTarget.style.color = '#f5f0eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#d4af37';
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
    </section>
  );
}
