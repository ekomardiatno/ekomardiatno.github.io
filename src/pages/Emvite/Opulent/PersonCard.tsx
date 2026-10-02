import { CornerOrnament, SparkleDots } from './Ornaments';

type PersonProps = {
  name: string;
  photo?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  personType: 'bride' | 'groom';
  onPhotoClick?: () => void;
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
  personType,
  onPhotoClick,
}: PersonProps) {
  return (
    <div className="text-center">
      {/* Photo with ornate frame */}
      <div className="relative inline-block mx-auto mb-6">
        <div
          className={`relative w-40 h-52 md:w-48 md:h-64 overflow-hidden ${photo ? 'cursor-pointer' : ''}`}
          style={{ border: '2px solid #b8860b' }}
          onClick={photo ? onPhotoClick : undefined}
        >
          {/* Inner border */}
          <div
            className="absolute inset-1 pointer-events-none z-10"
            style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
          />

          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: '#f0e8de' }}
            >
              <span
                className="text-4xl opulent-shimmer"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {name
                  .split(' ')
                  .slice(0, 2)
                  .map((v) => v.at(0)?.toUpperCase())
                  .join('')}
              </span>
            </div>
          )}

          {/* Tap hint for photos */}
          {photo && (
            <div
              className="absolute inset-0 flex items-end justify-center pb-3 z-20 opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#d4af37',
                }}
              >
                Tap untuk memperbesar
              </span>
            </div>
          )}
        </div>

        {/* Corner ornaments on photo */}
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />

        {/* Sparkle dots around frame */}
        <SparkleDots />
      </div>

      <h3
        className="text-xl md:text-2xl mb-2"
        style={{
          fontFamily: "'Bodoni Moda', serif",
          color: '#1a1a1a',
        }}
      >
        {name}
      </h3>

      {(fatherName || motherName) && (
        <div className="mb-2">
          <p
            className="text-sm italic"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              color: '#b8860b',
            }}
          >
            {personType === 'bride' ? 'Putri dari' : 'Putra dari'}
          </p>
          <p
            className="text-sm mt-1"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              color: '#4a4a4a',
              fontWeight: 300,
            }}
          >
            {[fatherName, motherName].filter((v) => !!v).join(' & ')}
          </p>
        </div>
      )}

      {hometown && (
        <p
          className="text-sm italic"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          {hometown}
        </p>
      )}
    </div>
  );
}
