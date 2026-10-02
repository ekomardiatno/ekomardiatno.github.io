import { useState } from 'react';
import { PROVIDERS } from '../../../constants';
import useEmvite from '../../../hooks/useEmvite';
import { OrnamentDivider, CornerOrnament } from './Ornaments';
import useScrollReveal from './useScrollReveal';

type GiftCardProps = {
  recipient: string;
  providerName: string;
  accountNumber: string;
};

function GiftCard({ recipient, providerName, accountNumber }: GiftCardProps) {
  const { toast } = useEmvite();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      toast('Nomor rekening berhasil disalin');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
      toast('Tidak berhasil menyalin nomor rekening');
    }
  };

  const providerLogo = PROVIDERS.find((p) => p.name === providerName)?.logo
    .regular;

  return (
    <div
      className="relative p-8 text-center"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(184, 134, 11, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-24 h-auto" />
        </div>
      ) : (
        <p
          className="text-sm mb-4 uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#1a1a1a',
          }}
        >
          {providerName}
        </p>
      )}

      <p
        className="font-mono text-lg tracking-wider"
        style={{ color: '#1a1a1a' }}
      >
        {accountNumber}
      </p>

      <p
        className="mt-2 text-sm"
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          color: '#8a8a8a',
          fontWeight: 300,
        }}
      >
        a.n. {recipient}
      </p>

      <div
        className="w-8 h-px mx-auto my-5"
        style={{ backgroundColor: '#d4af37' }}
      />

      <button
        type="button"
        onClick={copyToClipboard}
        className="w-full py-3 text-xs uppercase tracking-[0.2em] transition cursor-pointer"
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          border: `1px solid ${copied ? '#1b4332' : '#b8860b'}`,
          color: copied ? '#f5f0eb' : '#b8860b',
          backgroundColor: copied ? '#1b4332' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = '#b8860b';
            e.currentTarget.style.color = '#f5f0eb';
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#b8860b';
          }
        }}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Tersalin
          </span>
        ) : (
          'Salin Nomor Rekening'
        )}
      </button>
    </div>
  );
}

export default function WeddingGiftSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  if (!data || data.giftInfos.length < 1) return null;

  return (
    <section id="gift" className="px-6 py-24" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Amplop Digital
        </h2>
        <OrnamentDivider className="mb-4" />
        <p
          className="mx-auto max-w-md text-sm"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih
        </p>
      </div>

      <div className="mx-auto max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.giftInfos.map((gift, i) => (
          <div
            key={i}
            className={`op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <GiftCard
              accountNumber={gift.accountNumber}
              providerName={gift.provider}
              recipient={gift.accountName}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
