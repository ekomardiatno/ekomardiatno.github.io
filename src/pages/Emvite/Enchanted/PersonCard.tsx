type PersonProps = {
  name: string;
  photo?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  personType: 'bride' | 'groom';
  direction: 'left' | 'right';
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
  personType,
  direction,
}: PersonProps) {
  const rotate = direction === 'left' ? '-2deg' : '2deg';

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{
        backgroundColor: '#fff5f5',
        boxShadow: '0 8px 32px rgba(183, 110, 121, 0.12)',
        transform: `rotate(${rotate})`,
      }}
    >
      <div className="mx-auto w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden flex items-center justify-center mb-4"
        style={{ backgroundColor: '#fce4ec' }}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p
            className="text-3xl font-bold"
            style={{ color: '#b76e79' }}
          >
            {name
              .split(' ')
              .slice(0, 2)
              .map((v) => v.at(0)?.toUpperCase())
              .join('')}
          </p>
        )}
      </div>

      <h3
        className="text-xl md:text-2xl"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: '#2d2020',
        }}
      >
        {name}
      </h3>

      {(fatherName || motherName) && (
        <div className="mt-3">
          <p
            className="text-base"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#b76e79',
            }}
          >
            {personType === 'bride' ? 'Putri dari' : 'Putra dari'}
          </p>
          <p className="text-sm mt-1" style={{ color: '#6b5b5b' }}>
            {[fatherName, motherName].filter((v) => !!v).join(' & ')}
          </p>
        </div>
      )}

      {hometown && (
        <p className="mt-2 text-sm italic" style={{ color: '#9e8e8e' }}>
          {hometown}
        </p>
      )}
    </div>
  );
}
