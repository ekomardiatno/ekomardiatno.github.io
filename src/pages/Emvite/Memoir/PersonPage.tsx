import { EMVITE_API_URL } from '../../../config';

type PersonPageProps = {
  name: string;
  nickname?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  photoPath: string | null;
  personType: 'groom' | 'bride';
};

export default function PersonPage({
  name,
  fatherName,
  motherName,
  hometown,
  photoPath,
  personType,
}: PersonPageProps) {
  const photoUrl = photoPath
    ? photoPath.startsWith('http')
      ? photoPath
      : `${EMVITE_API_URL}/file?filePath=${photoPath}`
    : null;

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');

  const parentLabel = personType === 'bride' ? 'Putri dari' : 'Putra dari';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {photoUrl ? (
        <div className="relative w-full h-full">
          {/* Photo fills entire page */}
          <div
            className="absolute inset-0 bg-cover bg-top memoir-ken-burns"
            style={{ backgroundImage: `url(${photoUrl})` }}
          />
          {/* Gradient overlay — seamless fade into background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(20,18,16,0.1) 0%, rgba(20,18,16,0.3) 35%, rgba(20,18,16,0.85) 65%, #141210 85%)',
            }}
          />

          {/* Info overlaid at bottom */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-16">
            <h2
              className="memoir-reveal text-center"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                fontWeight: 400,
                color: '#f0ece4',
              }}
            >
              {name}
            </h2>

            {(fatherName || motherName) && (
              <>
                <div
                  className="memoir-divider my-4 memoir-reveal"
                  style={{ transitionDelay: '0.08s' }}
                />
                <p
                  className="memoir-reveal text-xs uppercase tracking-[0.2em] mb-2"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(240, 236, 228, 0.4)',
                    transitionDelay: '0.16s',
                  }}
                >
                  {parentLabel}
                </p>
                <p
                  className="memoir-reveal text-sm text-center"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(240, 236, 228, 0.6)',
                    transitionDelay: '0.24s',
                  }}
                >
                  {[fatherName, motherName].filter(Boolean).join(' & ')}
                </p>
              </>
            )}

            {hometown && (
              <p
                className="memoir-reveal mt-3 text-xs tracking-[0.15em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.35)',
                  transitionDelay: '0.32s',
                }}
              >
                {hometown}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* No photo — centered initials + info */
        <div className="flex flex-col items-center justify-center px-8 text-center">
          <div
            className="memoir-reveal flex items-center justify-center mb-8"
            style={{
              width: 120,
              height: 120,
              border: '1px solid rgba(200, 149, 108, 0.3)',
            }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#c8956c',
              }}
            >
              {initials}
            </span>
          </div>

          <h2
            className="memoir-reveal"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
              fontWeight: 400,
              color: '#f0ece4',
              transitionDelay: '0.08s',
            }}
          >
            {name}
          </h2>

          {(fatherName || motherName) && (
            <>
              <div
                className="memoir-divider my-5 memoir-reveal"
                style={{ transitionDelay: '0.16s' }}
              />
              <p
                className="memoir-reveal text-xs uppercase tracking-[0.2em] mb-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.4)',
                  transitionDelay: '0.24s',
                }}
              >
                {parentLabel}
              </p>
              <p
                className="memoir-reveal text-sm"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.6)',
                  transitionDelay: '0.32s',
                }}
              >
                {[fatherName, motherName].filter(Boolean).join(' & ')}
              </p>
            </>
          )}

          {hometown && (
            <p
              className="memoir-reveal mt-3 text-xs tracking-[0.15em]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: 'rgba(240, 236, 228, 0.35)',
                transitionDelay: '0.4s',
              }}
            >
              {hometown}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
