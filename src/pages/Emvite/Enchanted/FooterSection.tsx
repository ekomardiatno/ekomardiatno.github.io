import useEmvite from '../../../hooks/useEmvite';
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
    <footer className="px-6 py-16" ref={ref}>
      <div className="mx-auto max-w-3xl text-center">
        {/* Rose-gold divider */}
        <div
          className="mx-auto mb-10 h-px w-24"
          style={{ backgroundColor: 'rgba(183, 110, 121, 0.3)' }}
        />

        {data && (
          <>
            <h2
              className={`text-5xl md:text-6xl mb-6 reveal reveal-scale ${isVisible ? 'visible' : ''}`}
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: '#b76e79',
              }}
            >
              {groomInitial} & {brideInitial}
            </h2>

            <p
              className={`mb-6 text-sm leading-relaxed reveal reveal-up ${isVisible ? 'visible' : ''}`}
              style={{
                transitionDelay: '0.2s',
                color: '#6b5b5b',
              }}
            >
              Terima kasih atas doa, cinta, dan dukungan yang telah Anda
              berikan.
              <br />
              Kami sangat menantikan kehadiran Anda di hari bahagia kami.
            </p>

            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ backgroundColor: 'rgba(183, 110, 121, 0.3)' }}
            />

            <p
              className="text-xs tracking-wide"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#9e8e8e',
              }}
            >
              Dengan penuh cinta dan rasa syukur
            </p>
          </>
        )}

        <p className="mt-8 text-xs" style={{ color: '#d4c4c4' }}>
          &copy; 2026 EMVITE. Provided by Eko Mardiatno.
        </p>
      </div>
    </footer>
  );
}
