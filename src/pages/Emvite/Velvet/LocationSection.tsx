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
    <section
      id="location"
      className="py-24"
      style={{ backgroundColor: '#16213e' }}
      ref={ref}
    >
      <div className="mb-12 px-6 text-center">
        <h2
          className="text-3xl md:text-4xl tracking-wider uppercase mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#ffffff',
          }}
        >
          Lokasi Acara
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
          Kami nantikan kehadiran Anda
        </p>
      </div>

      <div className="px-6 mx-auto max-w-2xl">
        {mainEvent.location && (
          <div
            className={`v-reveal v-reveal-scale ${isVisible ? 'v-visible' : ''}`}
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
                border: '1px solid rgba(233, 69, 96, 0.15)',
              }}
              allowFullScreen
            />
          </div>
        )}

        <div
          className={`p-6 mt-0 v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
          style={{
            transitionDelay: '0.2s',
            backgroundColor: '#0f3460',
            borderBottom: '2px solid #e94560',
          }}
        >
          {mainEvent.venue && (
            <h3
              className="text-lg font-medium mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#ffffff',
              }}
            >
              {mainEvent.venue}
            </h3>
          )}
          {mainEvent.address && (
            <p
              className="text-sm mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
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
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm uppercase tracking-[0.15em] transition"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                backgroundColor: '#e94560',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c23152';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e94560';
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
