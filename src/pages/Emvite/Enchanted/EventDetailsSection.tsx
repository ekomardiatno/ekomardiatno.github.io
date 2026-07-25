import { useState } from 'react';
import moment from 'moment';
import useEmvite from '../../../hooks/useEmvite';
import EventCard from './EventCard';
import useScrollReveal from './useScrollReveal';

export default function EventDetailsSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(() => {
    if (!data || data.events.length < 1) return null;
    const mainIdx = data.events.findIndex((ev) => ev.isMainEvent);
    return mainIdx >= 0 ? mainIdx : 0;
  });

  if (!data || data.events.length < 1) return null;

  return (
    <section id="details" className="px-6 py-20" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Detail Acara
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div className="mx-auto max-w-xl space-y-4">
        {data.events.map((event, index) => (
          <div
            key={index}
            className={`reveal reveal-up ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <EventCard
              title={event.title}
              date={moment(event.date).format('ddd, DD MMM Y')}
              time={`${event.startTime.split(':').slice(0, 2).join(':')} - ${event.endTime.split(':').slice(0, 2).join(':')}`}
              venue={event.venue}
              address={event.address}
              location={event.location}
              isMain={event.isMainEvent}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
