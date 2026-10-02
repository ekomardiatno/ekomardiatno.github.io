import { useState } from 'react';
import { PROVIDERS } from '../../../constants';
import useEmvite from '../../../hooks/useEmvite';
import useScrollReveal from './useScrollReveal';

type Gift = {
  recipient: string;
  providerName: string;
  accountNumber: string;
};

const GiftBox = ({ recipient, providerName, accountNumber }: Gift) => {
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
    .white;

  return (
    <div
      className="p-6 text-center"
      style={{
        backgroundColor: '#16213e',
        borderBottom: '2px solid #53d8c7',
      }}
    >
      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-24 h-auto" />
        </div>
      ) : (
        <p
          className="text-sm mb-4 uppercase tracking-[0.15em]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#ffffff',
          }}
        >
          {providerName}
        </p>
      )}

      <p
        className="mt-1 font-mono text-lg tracking-wider"
        style={{ color: '#ffffff' }}
      >
        {accountNumber}
      </p>

      <p
        className="mt-2 text-sm"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#6b7a99',
        }}
      >
        a.n. {recipient}
      </p>

      <button
        type="button"
        onClick={copyToClipboard}
        className="mt-5 w-full py-3 text-sm uppercase tracking-[0.1em] transition cursor-pointer"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          border: `1px solid ${copied ? '#53d8c7' : '#e94560'}`,
          color: copied ? '#53d8c7' : '#e94560',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = '#e94560';
            e.currentTarget.style.color = '#ffffff';
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#e94560';
          }
        }}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="w-4 h-4 copy-check"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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
};

export default function WeddingGiftSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  if (!data || data.giftInfos.length < 1) return null;

  return (
    <section
      id="gift"
      className="py-24 px-6"
      style={{ backgroundColor: '#0f3460' }}
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
          Amplop Digital
        </h2>
        <div
          className="mx-auto w-12 h-[2px] mb-4"
          style={{ backgroundColor: '#e94560' }}
        />
        <p
          className="mx-auto max-w-md text-sm"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#6b7a99',
          }}
        >
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih
        </p>
      </div>

      <div className="mx-auto max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.giftInfos.map((gift, i) => (
          <div
            key={i}
            className={`v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <GiftBox
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
