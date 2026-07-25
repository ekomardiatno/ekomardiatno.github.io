import { useState } from 'react';

type PersonProps = {
  name: string;
  photo?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  personType: 'bride' | 'groom';
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
  personType,
}: PersonProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ height: 360 }}
    >
      <div className="flip-card-inner">
        {/* Front face */}
        <div
          className="flip-card-front rounded-none overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#16213e',
            borderBottom: '3px solid #e94560',
          }}
        >
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#0f3460' }}
          >
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <p
                className="text-5xl tracking-wider"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#e94560',
                }}
              >
                {name
                  .split(' ')
                  .slice(0, 2)
                  .map((v) => v.at(0)?.toUpperCase())
                  .join('')}
              </p>
            )}
          </div>

          <div className="p-5 text-center">
            <h3
              className="text-xl tracking-wider uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#ffffff',
              }}
            >
              {name}
            </h3>
            <p
              className="mt-1 text-xs tracking-[0.15em] uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              Tap untuk detail
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="flip-card-back rounded-none overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{
            backgroundColor: '#16213e',
            borderBottom: '3px solid #53d8c7',
          }}
        >
          {/* Geometric accent */}
          <div
            className="w-10 h-10 mb-4 flex items-center justify-center"
            style={{ border: '1px solid rgba(83, 216, 199, 0.3)' }}
          >
            <span
              className="text-lg"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#53d8c7',
              }}
            >
              {name.charAt(0)}
            </span>
          </div>

          <h3
            className="text-xl tracking-wider uppercase mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#ffffff',
            }}
          >
            {name}
          </h3>

          {(fatherName || motherName) && (
            <div className="mb-3">
              <p
                className="text-xs uppercase tracking-[0.15em] mb-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#53d8c7',
                }}
              >
                {personType === 'bride' ? 'Putri dari' : 'Putra dari'}
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#b8c0d0',
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
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              {hometown}
            </p>
          )}

          <p
            className="mt-4 text-xs tracking-[0.15em] uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#6b7a99',
            }}
          >
            Tap untuk kembali
          </p>
        </div>
      </div>
    </div>
  );
}
