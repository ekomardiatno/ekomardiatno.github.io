import useEmvite from '../../../hooks/useEmvite';

export default function ClosingPage() {
  const { data } = useEmvite();
  if (!data) return null;

  const { wedding } = data;

  const groomInitial = (wedding.groomNickname || wedding.groomName)
    .charAt(0)
    .toUpperCase();
  const brideInitial = (wedding.brideNickname || wedding.brideName)
    .charAt(0)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-8 text-center">
      <h2
        className="memoir-reveal"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(3rem, 12vw, 5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f0ece4',
          lineHeight: 1,
        }}
      >
        {groomInitial}
        <span style={{ color: '#c8956c', margin: '0 0.15em' }}>&amp;</span>
        {brideInitial}
      </h2>

      <div
        className="memoir-divider my-8 memoir-reveal"
        style={{ transitionDelay: '0.08s' }}
      />

      <p
        className="memoir-reveal text-sm leading-relaxed max-w-xs"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.5)',
          fontWeight: 300,
          transitionDelay: '0.16s',
        }}
      >
        Terima kasih atas doa dan kehadiran Anda. Semoga kebahagiaan senantiasa
        menyertai kita semua.
      </p>

      <p
        className="memoir-reveal mt-12 text-[9px] uppercase tracking-[0.2em]"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.2)',
          transitionDelay: '0.24s',
        }}
      >
        &copy; {new Date().getFullYear()} &middot; Emvite
      </p>
    </div>
  );
}
