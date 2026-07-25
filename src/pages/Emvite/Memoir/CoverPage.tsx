import moment from 'moment';
import useEmvite from '../../../hooks/useEmvite';
import { EMVITE_API_URL } from '../../../config';

export default function CoverPage() {
  const { data } = useEmvite();
  if (!data) return null;

  const { wedding, guest } = data;
  const mainEvent = data.events.find((e) => e.isMainEvent) || data.events[0];

  const toPhotoUrl = (path: string | null) =>
    path
      ? path.startsWith('http')
        ? path
        : `${EMVITE_API_URL}/file?filePath=${path}`
      : null;

  const groomPhoto = toPhotoUrl(wedding.groomPhotoPath);
  const bridePhoto = toPhotoUrl(wedding.bridePhotoPath);
  const hasBothPhotos = groomPhoto && bridePhoto;
  const singlePhoto = groomPhoto || bridePhoto;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full px-8">
      {hasBothPhotos ? (
        <>
          {/* Split background — groom left, bride right */}
          <div
            className="absolute inset-0 bg-cover bg-center memoir-ken-burns"
            style={{
              backgroundImage: `url(${groomPhoto})`,
              clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)',
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center memoir-ken-burns"
            style={{
              backgroundImage: `url(${bridePhoto})`,
              clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.85) 100%)',
            }}
          />
        </>
      ) : singlePhoto ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center memoir-ken-burns"
            style={{ backgroundImage: `url(${singlePhoto})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(20,18,16,0.6) 0%, rgba(20,18,16,0.85) 100%)',
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 text-center">
        {guest && (
          <div
            className="memoir-reveal inline-block mb-8 px-5 py-2 text-xs uppercase tracking-[0.25em]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              border: '1px solid rgba(200, 149, 108, 0.4)',
              color: 'rgba(240, 236, 228, 0.6)',
            }}
          >
            {guest.name}
          </div>
        )}

        <h1
          className="memoir-reveal"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#f0ece4',
            transitionDelay: '0.08s',
          }}
        >
          {wedding.groomNickname || wedding.groomName}
        </h1>

        <p
          className="memoir-reveal my-3"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(1.5rem, 6vw, 3rem)',
            fontWeight: 300,
            color: '#c8956c',
            transitionDelay: '0.16s',
          }}
        >
          &amp;
        </p>

        <h1
          className="memoir-reveal"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#f0ece4',
            transitionDelay: '0.24s',
          }}
        >
          {wedding.brideNickname || wedding.brideName}
        </h1>

        {mainEvent && (
          <p
            className="memoir-reveal mt-8 text-xs uppercase tracking-[0.3em]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: 'rgba(240, 236, 228, 0.5)',
              transitionDelay: '0.32s',
            }}
          >
            {moment(mainEvent.date).format('DD . MM . YYYY')}
          </p>
        )}

        <p
          className="memoir-reveal memoir-pulse mt-12 text-xs tracking-[0.15em]"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.35)',
            transitionDelay: '0.4s',
          }}
        >
          Ketuk untuk memulai &rarr;
        </p>
      </div>
    </div>
  );
}
