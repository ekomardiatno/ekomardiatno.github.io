import { useMemo } from 'react';
import useEmvite from '../../../hooks/useEmvite';
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
    <section id="location" className="py-20" ref={ref}>
      <div className="mb-12 px-6 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Lokasi Acara
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Kami nantikan kehadiran Anda
        </p>
      </div>

      <div className="px-6 mx-auto max-w-2xl">
        {mainEvent.location && (
          <div
            className={`reveal reveal-scale ${isVisible ? 'visible' : ''}`}
          >
            <iframe
              src={`https://www.google.com/maps?q=${mainEvent.location
                .split(', ')
                .map((v) => v.trim())
                .join(',')}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full border-0 rounded-2xl"
              style={{
                height: '300px',
                border: '2px solid rgba(183, 110, 121, 0.15)',
              }}
              allowFullScreen
            />
          </div>
        )}

        <div
          className={`rounded-2xl p-6 mt-4 reveal reveal-up ${isVisible ? 'visible' : ''}`}
          style={{
            transitionDelay: '0.2s',
            backgroundColor: '#fff5f5',
            boxShadow: '0 4px 16px rgba(183, 110, 121, 0.08)',
          }}
        >
          {mainEvent.venue && (
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: '#2d2020' }}
            >
              {mainEvent.venue}
            </h3>
          )}
          {mainEvent.address && (
            <p className="text-sm mb-4" style={{ color: '#6b5b5b' }}>
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
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm tracking-wide transition"
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
            >
              Buka di Google Maps
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
