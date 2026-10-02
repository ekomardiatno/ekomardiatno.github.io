import { EMVITE_API_URL } from '../../../config';
import useEmvite from '../../../hooks/useEmvite';
import PersonCard from './PersonCard';
import useScrollReveal from './useScrollReveal';

export default function CoupleSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  if (!data) return null;

  return (
    <section id="couple" className="px-6 py-20" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Mempelai
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Dengan penuh rasa syukur
        </p>
      </div>

      <div className="mx-auto max-w-sm space-y-[-20px]">
        <div
          className={`relative z-10 reveal reveal-left ${isVisible ? 'visible' : ''}`}
        >
          <PersonCard
            name={data.wedding.groomName}
            photo={
              data.wedding.groomPhotoPath
                ? `${EMVITE_API_URL}/file?filePath=${data.wedding.groomPhotoPath}`
                : undefined
            }
            fatherName={data.wedding.groomFatherName}
            motherName={data.wedding.groomMotherName}
            hometown={data.wedding.groomHometown}
            personType="groom"
            direction="left"
          />
        </div>
        <div
          className={`relative z-20 reveal reveal-right ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <PersonCard
            name={data.wedding.brideName}
            photo={
              data.wedding.bridePhotoPath
                ? `${EMVITE_API_URL}/file?filePath=${data.wedding.bridePhotoPath}`
                : undefined
            }
            fatherName={data.wedding.brideFatherName}
            motherName={data.wedding.brideMotherName}
            hometown={data.wedding.brideHometown}
            personType="bride"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
