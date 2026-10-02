import { useMemo, useState } from 'react';
import moment from 'moment';
import useEmvite from '../../../hooks/useEmvite';
import useScrollReveal from './useScrollReveal';

export default function EventDetailsSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const defaultIndex = useMemo(() => {
    if (!data || data.events.length < 1) return 0;
    const idx = data.events.findIndex((ev) => ev.isMainEvent);
    return idx >= 0 ? idx : 0;
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  if (!data || data.events.length < 1) return null;

  const active = data.events[activeIndex];

  return (
    <section
      id="details"
      className="py-24 px-6"
      style={{ backgroundColor: '#0f3460' }}
      ref={ref}
    >
      <div className="mb-12 text-center">
        <h2
          className="text-3xl md:text-4xl tracking-wider uppercase mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#ffffff',
          }}
        >
          Detail Acara
        </h2>
        <div
          className="mx-auto w-12 h-[2px] mb-4"
          style={{ backgroundColor: '#e94560' }}
        />
        <p
          className="text-sm max-w-md mx-auto"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#6b7a99',
          }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div
        className={`mx-auto max-w-xl v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
      >
        {/* Step indicators */}
        <div className="flex items-center justify-center mb-10">
          {data.events.map((event, i) => (
            <div key={i} className="flex items-center">
              <button
                type="button"
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setActiveIndex(i)}
              >
                <span
                  className="text-3xl md:text-4xl transition-colors duration-300"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: i === activeIndex ? '#e94560' : '#6b7a99',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.15em] mt-1 transition-colors duration-300"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: i === activeIndex ? '#b8c0d0' : '#6b7a99',
                  }}
                >
                  {event.title}
                </span>
              </button>

              {i < data.events.length - 1 && (
                <div
                  className="w-12 md:w-20 h-px mx-4 md:mx-6"
                  style={{ backgroundColor: 'rgba(233, 69, 96, 0.25)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active event detail card */}
        <div
          key={activeIndex}
          className="velvet-event-enter p-8"
          style={{
            backgroundColor: '#16213e',
            borderLeft: `3px solid ${active.isMainEvent ? '#e94560' : '#53d8c7'}`,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <h3
              className="text-2xl md:text-3xl tracking-wider uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#ffffff',
              }}
            >
              {active.title}
            </h3>
            {active.isMainEvent && (
              <span
                className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundColor: 'rgba(233, 69, 96, 0.15)',
                  color: '#e94560',
                }}
              >
                Utama
              </span>
            )}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(233, 69, 96, 0.1)' }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="#e94560"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: '#6b7a99' }}
                >
                  Tanggal
                </p>
                <p style={{ color: '#b8c0d0' }}>
                  {moment(active.date).format('ddd, DD MMM Y')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(233, 69, 96, 0.1)' }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="#e94560"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: '#6b7a99' }}
                >
                  Waktu
                </p>
                <p style={{ color: '#b8c0d0' }}>
                  {active.startTime.split(':').slice(0, 2).join(':')} -{' '}
                  {active.endTime.split(':').slice(0, 2).join(':')}
                </p>
              </div>
            </div>

            {active.venue && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(233, 69, 96, 0.1)' }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="#e94560"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: '#6b7a99' }}
                  >
                    Tempat
                  </p>
                  <p className="font-medium" style={{ color: '#ffffff' }}>
                    {active.venue}
                  </p>
                </div>
              </div>
            )}

            {active.address && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(233, 69, 96, 0.1)' }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="#e94560"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: '#6b7a99' }}
                  >
                    Alamat
                  </p>
                  <p style={{ color: '#b8c0d0' }}>{active.address}</p>
                </div>
              </div>
            )}
          </div>

          {active.location && (
            <div
              className="mt-6 pt-5"
              style={{ borderTop: '1px solid rgba(233, 69, 96, 0.1)' }}
            >
              <a
                href={`https://www.google.com/maps?q=${active.location
                  .split(', ')
                  .map((v) => v.trim())
                  .join(',')}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#53d8c7',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#53d8c7';
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Buka di Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
