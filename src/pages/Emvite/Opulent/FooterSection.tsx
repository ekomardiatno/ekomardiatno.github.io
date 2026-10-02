import useEmvite from '../../../hooks/useEmvite';
import { OrnamentDivider } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function FooterSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const groomInitial =
    data?.wedding.groomNickname?.charAt(0) ||
    data?.wedding.groomName?.charAt(0) ||
    '';
  const brideInitial =
    data?.wedding.brideNickname?.charAt(0) ||
    data?.wedding.brideName?.charAt(0) ||
    '';

  return (
    <footer className="px-6 py-20 relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-3xl text-center relative z-10">
        {data && (
          <>
            <h2
              className={`text-5xl md:text-6xl mb-4 opulent-shimmer op-reveal op-reveal-scale ${isVisible ? 'op-visible' : ''}`}
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontStyle: 'italic',
              }}
            >
              {groomInitial}
              <span
                className="mx-3"
                style={{ color: '#d4af37', fontWeight: 300 }}
              >
                &amp;
              </span>
              {brideInitial}
            </h2>

            <OrnamentDivider className="mb-6" />

            <p
              className={`mb-6 text-sm leading-relaxed op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
              style={{
                transitionDelay: '0.2s',
                fontFamily: "'Josefin Sans', sans-serif",
                color: '#8a8a8a',
                fontWeight: 300,
              }}
            >
              Terima kasih atas doa, cinta, dan dukungan yang telah Anda
              berikan.
              <br />
              Kami sangat menantikan kehadiran Anda di hari bahagia kami.
            </p>

            <div
              className="w-8 h-px mx-auto mb-6"
              style={{ backgroundColor: 'rgba(184, 134, 11, 0.3)' }}
            />

            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                color: '#8a8a8a',
                fontWeight: 300,
              }}
            >
              Dengan penuh cinta dan rasa syukur
            </p>
          </>
        )}

        <p
          className="mt-10 text-xs"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: 'rgba(138, 138, 138, 0.4)',
          }}
        >
          &copy; 2026 EMVITE. Provided by Eko Mardiatno.
        </p>
      </div>
    </footer>
  );
}
