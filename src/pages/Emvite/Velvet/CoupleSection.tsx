import { EMVITE_API_URL } from '../../../config';
import useEmvite from '../../../hooks/useEmvite';
import PersonCard from './PersonCard';
import useScrollReveal from './useScrollReveal';

export default function CoupleSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  if (!data) return null;

  return (
    <section
      id="couple"
      className="px-6 py-24"
      style={{ backgroundColor: '#1a1a2e' }}
      ref={ref}
    >
      <div className="mb-12 text-center">
        <h2
          className="text-3xl md:text-4xl tracking-wider uppercase mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#ffffff',
          }}
        >
          Mempelai
        </h2>
        <div
          className="mx-auto w-12 h-[2px] mb-4"
          style={{ backgroundColor: '#e94560' }}
        />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#6b7a99',
          }}
        >
          Dengan penuh rasa syukur
        </p>
      </div>

      <div className="mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`v-reveal v-reveal-left ${isVisible ? 'v-visible' : ''}`}
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
          />
        </div>
        <div
          className={`v-reveal v-reveal-right ${isVisible ? 'v-visible' : ''}`}
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
          />
        </div>
      </div>
    </section>
  );
}
