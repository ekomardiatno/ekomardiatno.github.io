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
    <footer
      className="px-6 py-20 relative overflow-hidden"
      style={{ backgroundColor: '#1a1a2e' }}
      ref={ref}
    >
      {/* Geometric decorations */}
      <div
        className="geo-circle"
        style={{ width: 200, height: 200, bottom: '-60px', right: '-60px' }}
      />
      <div
        className="geo-line"
        style={{ width: 60, height: 1, top: 40, left: '20%' }}
      />

      <div className="mx-auto max-w-3xl text-center relative z-10">
        {data && (
          <>
            <h2
              className={`text-7xl md:text-8xl tracking-wider uppercase mb-6 v-reveal v-reveal-scale ${isVisible ? 'v-visible' : ''}`}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#e94560',
              }}
            >
              {groomInitial}
              <span style={{ color: '#53d8c7' }}> & </span>
              {brideInitial}
            </h2>

            <div
              className="mx-auto w-16 h-[2px] mb-6"
              style={{ backgroundColor: 'rgba(233, 69, 96, 0.3)' }}
            />

            <p
              className={`mb-6 text-sm leading-relaxed v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
              style={{
                transitionDelay: '0.2s',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              Terima kasih atas doa, cinta, dan dukungan yang telah Anda
              berikan.
              <br />
              Kami sangat menantikan kehadiran Anda di hari bahagia kami.
            </p>

            <div
              className="mx-auto w-8 h-[1px] mb-6"
              style={{ backgroundColor: 'rgba(233, 69, 96, 0.2)' }}
            />

            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              Dengan penuh cinta dan rasa syukur
            </p>
          </>
        )}

        <p
          className="mt-10 text-xs"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'rgba(107, 122, 153, 0.4)',
          }}
        >
          &copy; 2026 EMVITE. Provided by Eko Mardiatno.
        </p>
      </div>
    </footer>
  );
}
