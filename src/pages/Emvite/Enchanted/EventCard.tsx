type EventProps = {
  title: string;
  date: string;
  time: string;
  venue: string | null;
  address: string | null;
  location: string | null;
  isMain?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function EventCard({
  title,
  date,
  time,
  address,
  venue,
  location,
  isMain,
  isExpanded,
  onToggle,
}: EventProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-shadow"
      style={{
        backgroundColor: '#fff5f5',
        boxShadow: isExpanded
          ? '0 8px 32px rgba(183, 110, 121, 0.15)'
          : '0 2px 8px rgba(183, 110, 121, 0.08)',
        borderLeft: isExpanded ? '4px solid #b76e79' : '4px solid transparent',
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer text-left"
        onClick={onToggle}
      >
        <div>
          <h3
            className="text-lg"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: isMain ? '#b76e79' : '#2d2020',
            }}
          >
            {title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: '#9e8e8e' }}>
            {date}
          </p>
        </div>
        <svg
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{
            color: '#b76e79',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="accordion-content"
        style={isExpanded ? { maxHeight: 300, padding: '0 24px 20px' } : {}}
      >
        <div className="space-y-2 text-sm">
          <p style={{ color: '#6b5b5b' }}>
            {time}
          </p>
          {venue && (
            <p className="font-medium" style={{ color: '#2d2020' }}>
              {venue}
            </p>
          )}
          {address && (
            <p className="text-xs" style={{ color: '#9e8e8e' }}>
              {address}
            </p>
          )}
          {location && (
            <a
              href={`https://www.google.com/maps?q=${location.split(', ').map((v) => v.trim()).join(',')}`}
              target="_blank"
              className="inline-flex items-center gap-1 mt-2 text-sm transition"
              style={{ color: '#b76e79' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#9c5c66';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#b76e79';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
