import { useState } from 'react';
import { EMVITE_API_URL } from '../../../config';
import useEmvite from '../../../hooks/useEmvite';
import PersonCard from './PersonCard';
import PhotoModal from './PhotoModal';
import { OrnamentDivider } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function CoupleSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();
  const [modalPhoto, setModalPhoto] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  if (!data) return null;

  const groomPhoto = data.wedding.groomPhotoPath
    ? `${EMVITE_API_URL}/file?filePath=${data.wedding.groomPhotoPath}`
    : undefined;
  const bridePhoto = data.wedding.bridePhotoPath
    ? `${EMVITE_API_URL}/file?filePath=${data.wedding.bridePhotoPath}`
    : undefined;

  return (
    <section id="couple" className="px-6 py-24" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Mempelai
        </h2>
        <OrnamentDivider className="mb-4" />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          Dengan penuh rasa syukur
        </p>
      </div>

      <div className="mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div
          className={`op-reveal op-reveal-left ${isVisible ? 'op-visible' : ''}`}
        >
          <PersonCard
            name={data.wedding.groomName}
            photo={groomPhoto}
            fatherName={data.wedding.groomFatherName}
            motherName={data.wedding.groomMotherName}
            hometown={data.wedding.groomHometown}
            personType="groom"
            onPhotoClick={
              groomPhoto
                ? () =>
                    setModalPhoto({
                      src: groomPhoto,
                      alt: data.wedding.groomName,
                    })
                : undefined
            }
          />
        </div>

        <div
          className={`op-reveal op-reveal-right ${isVisible ? 'op-visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <PersonCard
            name={data.wedding.brideName}
            photo={bridePhoto}
            fatherName={data.wedding.brideFatherName}
            motherName={data.wedding.brideMotherName}
            hometown={data.wedding.brideHometown}
            personType="bride"
            onPhotoClick={
              bridePhoto
                ? () =>
                    setModalPhoto({
                      src: bridePhoto,
                      alt: data.wedding.brideName,
                    })
                : undefined
            }
          />
        </div>
      </div>

      {modalPhoto && (
        <PhotoModal
          src={modalPhoto.src}
          alt={modalPhoto.alt}
          onClose={() => setModalPhoto(null)}
        />
      )}
    </section>
  );
}
