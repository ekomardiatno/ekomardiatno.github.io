import moment from 'moment';
import type { EventDataType } from '../../../types/emvite.type';

type EventPageProps = {
  event: EventDataType;
};

export default function EventPage({ event }: EventPageProps) {
  const formatTime = (t: string) => t.split(':').slice(0, 2).join(':');

  const mapUrl = event.location
    ? `https://www.google.com/maps/search/?api=1&query=${event.location.replace(/\s/g, '')}`
    : null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-8 text-center">
      {event.isMainEvent && (
        <span
          className="memoir-reveal inline-block mb-6 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Outfit', sans-serif",
            border: '1px solid rgba(200, 149, 108, 0.3)',
            color: '#c8956c',
          }}
        >
          Acara Utama
        </span>
      )}

      <h2
        className="memoir-reveal"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
          fontWeight: 400,
          color: '#f0ece4',
          transitionDelay: event.isMainEvent ? '0.08s' : '0s',
        }}
      >
        {event.title}
      </h2>

      <div
        className="memoir-divider my-6 memoir-reveal"
        style={{ transitionDelay: event.isMainEvent ? '0.16s' : '0.08s' }}
      />

      <p
        className="memoir-reveal text-sm tracking-[0.1em]"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.7)',
          transitionDelay: event.isMainEvent ? '0.24s' : '0.16s',
        }}
      >
        {moment(event.date).format('dddd, DD MMMM YYYY')}
      </p>

      <p
        className="memoir-reveal mt-3 text-sm"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.5)',
          transitionDelay: event.isMainEvent ? '0.32s' : '0.24s',
        }}
      >
        {formatTime(event.startTime)}
        {event.endTime ? ` — ${formatTime(event.endTime)}` : ''} WIB
      </p>

      {event.venue && (
        <p
          className="memoir-reveal mt-6 text-base font-medium"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: '#f0ece4',
            transitionDelay: event.isMainEvent ? '0.4s' : '0.32s',
          }}
        >
          {event.venue}
        </p>
      )}

      {event.address && (
        <p
          className="memoir-reveal mt-2 text-xs max-w-xs leading-relaxed"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.4)',
            transitionDelay: event.isMainEvent ? '0.48s' : '0.4s',
          }}
        >
          {event.address}
        </p>
      )}

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="memoir-reveal inline-block mt-6 text-xs uppercase tracking-[0.2em] transition-colors"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: '#c8956c',
            transitionDelay: event.isMainEvent ? '0.56s' : '0.48s',
          }}
          data-memoir-interactive
        >
          Buka Maps &rarr;
        </a>
      )}
    </div>
  );
}
