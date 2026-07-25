import { useState } from 'react';
import { PROVIDERS } from '../../../constants';
import useEmvite from '../../../hooks/useEmvite';

export default function GiftPage() {
  const { data } = useEmvite();
  if (!data || data.giftInfos.length < 1) return null;

  return (
    <div className="flex flex-col w-full px-6 pt-20 pb-20">
      <div className="flex flex-col items-center justify-start max-w-lg mx-auto w-full">
        <h2
          className="memoir-reveal text-center mb-2"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 400,
            color: '#f0ece4',
          }}
        >
          Amplop Digital
        </h2>

        <p
          className="memoir-reveal text-xs text-center mb-8 max-w-xs"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.4)',
            transitionDelay: '0.08s',
          }}
        >
          Kehadiran Anda merupakan hadiah terindah bagi kami
        </p>

        <div className="w-full space-y-4">
          {data.giftInfos.map((gift, i) => (
            <GiftCard
              key={i}
              index={i}
              providerName={gift.provider}
              accountNumber={gift.accountNumber}
              recipient={gift.accountName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type GiftCardProps = {
  index: number;
  providerName: string;
  accountNumber: string;
  recipient: string;
};

function GiftCard({
  index,
  providerName,
  accountNumber,
  recipient,
}: GiftCardProps) {
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
      className="memoir-reveal memoir-surface p-6 text-center w-full"
      style={{ transitionDelay: `${(index + 2) * 0.08}s` }}
    >
      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-20 h-auto" alt={providerName} />
        </div>
      ) : (
        <p
          className="text-xs mb-4 uppercase tracking-[0.2em]"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.6)',
          }}
        >
          {providerName}
        </p>
      )}

      <p
        className="font-mono text-lg tracking-wider"
        style={{ color: '#f0ece4' }}
      >
        {accountNumber}
      </p>

      <p
        className="mt-1 text-xs"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: 'rgba(240, 236, 228, 0.4)',
        }}
      >
        a.n. {recipient}
      </p>

      <div className="memoir-divider my-4" />

      <button
        type="button"
        onClick={copyToClipboard}
        className="w-full py-2.5 text-[10px] uppercase tracking-[0.2em] transition cursor-pointer"
        style={{
          fontFamily: "'Outfit', sans-serif",
          border: `1px solid ${copied ? '#4ade80' : 'rgba(200, 149, 108, 0.3)'}`,
          color: copied ? '#4ade80' : '#c8956c',
          backgroundColor: 'transparent',
        }}
        data-memoir-interactive
      >
        {copied ? (
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 memoir-copy-check"
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
