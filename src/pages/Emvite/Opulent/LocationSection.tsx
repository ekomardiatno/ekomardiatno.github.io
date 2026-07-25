import { useMemo } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { CornerOrnament, OrnamentDivider } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function LocationSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const mainEvent = useMemo(() => {
    if (!data || data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) || data.events[0];
  }, [data]);

  if (
    !mainEvent ||
    (!mainEvent.location && !mainEvent.address && !mainEvent.venue)
  )
    return null;

  return (
    <section id="location" className="py-24" ref={ref}>
      <div className="mb-12 px-6 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Lokasi Acara
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
          Kami nantikan kehadiran Anda
        </p>
      </div>

      <div className="px-6 mx-auto max-w-2xl">
        {mainEvent.location && (
          <div
            className={`relative op-reveal op-reveal-scale ${isVisible ? 'op-visible' : ''}`}
          >
            <iframe
              src={`https://www.google.com/maps?q=${mainEvent.location
                .split(', ')
                .map((v) => v.trim())
                .join(',')}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full border-0"
              style={{
                height: '300px',
                border: '2px solid rgba(184, 134, 11, 0.2)',
              }}
              allowFullScreen
            />
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />
          </div>
        )}

        <div
          className={`p-8 mt-4 text-center op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
          style={{
            transitionDelay: '0.2s',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(184, 134, 11, 0.15)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          {mainEvent.venue && (
            <h3
              className="text-lg mb-2"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                color: '#1a1a1a',
              }}
            >
              {mainEvent.venue}
            </h3>
          )}
          {mainEvent.address && (
            <p
              className="text-sm mb-5"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                color: '#8a8a8a',
                fontWeight: 300,
              }}
            >
              {mainEvent.address}
            </p>
          )}
          {mainEvent.location && (
            <a
              href={`https://www.google.com/maps?q=${mainEvent.location
                .split(', ')
                .map((v) => v.trim())
                .join(',')}`}
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-2.5 text-xs uppercase tracking-[0.2em] transition"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                backgroundColor: '#b8860b',
                color: '#f5f0eb',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#96700a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#b8860b';
              }}
            >
              Buka di Google Maps
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
