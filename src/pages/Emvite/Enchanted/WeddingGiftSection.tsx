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
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      toast('Nomor rekening berhasil disalin');
    } catch (e) {
      console.error(e);
      toast('Tidak berhasil menyalin nomor rekening');
    }
  };

  const providerLogo = PROVIDERS.find((p) => p.name === providerName)?.logo
    .regular;

  return (
    <div
      className="rounded-2xl p-8 text-center"
      style={{
        backgroundColor: '#fff5f5',
        boxShadow: '0 4px 16px rgba(183, 110, 121, 0.08)',
      }}
    >
      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-28 h-auto" />
        </div>
      ) : (
        <p
          className="text-sm mb-4 font-medium"
          style={{ color: '#2d2020' }}
        >
          {providerName}
        </p>
      )}

      <p
        className="mt-1 font-mono text-lg tracking-wider"
        style={{ color: '#2d2020' }}
      >
        {accountNumber}
      </p>

      <p className="mt-2 text-sm" style={{ color: '#6b5b5b' }}>
        a.n. {recipient}
      </p>

      <button
        type="button"
        onClick={copyToClipboard}
        className="mt-6 w-full rounded-full border px-6 py-3 text-sm transition cursor-pointer"
        style={{
          borderColor: '#b76e79',
          color: '#b76e79',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#b76e79';
          e.currentTarget.style.color = '#fdf8f4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#b76e79';
        }}
      >
        Salin Nomor Rekening
      </button>
    </div>
  );
};

export default function WeddingGiftSection() {
  const { data } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  if (!data || data.giftInfos.length < 1) return null;

  return (
    <section id="gift" className="py-20 px-6" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Amplop Digital
        </h2>
        <p className="mx-auto max-w-md text-sm" style={{ color: '#9e8e8e' }}>
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih
        </p>
      </div>

      <div className="mx-auto max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.giftInfos.map((gift, i) => (
          <div
            key={i}
            className={`reveal reveal-up ${isVisible ? 'visible' : ''}`}
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
