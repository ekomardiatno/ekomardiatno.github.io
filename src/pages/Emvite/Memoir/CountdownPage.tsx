import useEmvite from '../../../hooks/useEmvite';
import useCountdown from './useCountdown';

export default function CountdownPage() {
  const { data } = useEmvite();
  if (!data) return null;

  const mainEvent = data.events.find((e) => e.isMainEvent) || data.events[0];
  if (!mainEvent) return null;

  const eventDate = new Date(mainEvent.date);
  if (mainEvent.startTime) {
    const [h, m, s] = mainEvent.startTime.split(':').map(Number);
    eventDate.setHours(h, m, s || 0);
  }

  return <CountdownInner targetDate={eventDate} />;
}

function CountdownInner({ targetDate }: { targetDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const units = [
    { value: days, label: 'Hari' },
    { value: hours, label: 'Jam' },
    { value: minutes, label: 'Menit' },
    { value: seconds, label: 'Detik' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-8">
      <p
        className="memoir-reveal mb-10 text-xs uppercase tracking-[0.3em]"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.5)',
        }}
      >
        Menuju Hari Bahagia
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {units.map((unit, i) => (
          <div
            key={unit.label}
            className="memoir-reveal text-center"
            style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                fontWeight: 300,
                color: '#f0ece4',
                lineHeight: 1,
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <p
              className="mt-2 text-[10px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: 'rgba(240, 236, 228, 0.4)',
              }}
            >
              {unit.label}
            </p>
          </div>
        ))}
      </div>

      <div className="memoir-divider mt-12 memoir-reveal" style={{ transitionDelay: '0.4s' }} />
    </div>
  );
}
