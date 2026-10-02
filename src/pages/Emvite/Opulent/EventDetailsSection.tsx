import { useMemo, useState } from 'react';
import moment from 'moment';
import useEmvite from '../../../hooks/useEmvite';
import { OrnamentDivider, CornerOrnament } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function EventDetailsSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const defaultIdx = useMemo(() => {
    if (!data || data.events.length < 1) return 0;
    const idx = data.events.findIndex((ev) => ev.isMainEvent);
    return idx >= 0 ? idx : 0;
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(defaultIdx);

  if (!data || data.events.length < 1) return null;

  const active = data.events[activeIndex];

  return (
    <section id="details" className="px-6 py-24 opulent-marble" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Detail Acara
        </h2>
        <OrnamentDivider className="mb-4" />
        <p
          className="text-sm max-w-md mx-auto"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div
        className={`mx-auto max-w-lg op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
      >
        {/* Navigation arrows + page indicator */}
        {data.events.length > 1 && (
          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center cursor-pointer transition"
              style={{
                border: '1px solid rgba(184, 134, 11, 0.3)',
                color: activeIndex > 0 ? '#b8860b' : 'rgba(184, 134, 11, 0.2)',
              }}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                color: '#b8860b',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(data.events.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center cursor-pointer transition"
              style={{
                border: '1px solid rgba(184, 134, 11, 0.3)',
                color: activeIndex < data.events.length - 1 ? '#b8860b' : 'rgba(184, 134, 11, 0.2)',
              }}
              onClick={() => setActiveIndex((i) => Math.min(data.events.length - 1, i + 1))}
              disabled={activeIndex === data.events.length - 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Event card — like a luxury booklet page */}
        <div
          key={activeIndex}
          className="relative p-10 md:p-12 text-center op-card-enter"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(184, 134, 11, 0.2)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
          }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {active.isMainEvent && (
            <span
              className="inline-block mb-4 px-4 py-1 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                border: '1px solid rgba(184, 134, 11, 0.3)',
                color: '#b8860b',
              }}
            >
              Acara Utama
            </span>
          )}

          <h3
            className="text-2xl md:text-3xl mb-6"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              color: '#1a1a1a',
            }}
          >
            {active.title}
          </h3>

          <div
            className="w-8 h-px mx-auto mb-6"
            style={{ backgroundColor: '#d4af37' }}
          />

          <div
            className="space-y-3 text-sm"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <p style={{ color: '#4a4a4a' }}>
              {moment(active.date).format('dddd, DD MMMM YYYY')}
            </p>
            <p style={{ color: '#4a4a4a' }}>
              {active.startTime.split(':').slice(0, 2).join(':')} -{' '}
              {active.endTime.split(':').slice(0, 2).join(':')}
            </p>
            {active.venue && (
              <p className="font-medium" style={{ color: '#1a1a1a' }}>
                {active.venue}
              </p>
            )}
            {active.address && (
              <p className="text-xs" style={{ color: '#8a8a8a', fontWeight: 300 }}>
                {active.address}
              </p>
            )}
          </div>

          {active.location && (
            <div className="mt-8">
              <a
                href={`https://www.google.com/maps?q=${active.location
                  .split(', ')
                  .map((v) => v.trim())
                  .join(',')}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  border: '1px solid #b8860b',
                  color: '#b8860b',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b8860b';
                  e.currentTarget.style.color = '#f5f0eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#b8860b';
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Buka Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
