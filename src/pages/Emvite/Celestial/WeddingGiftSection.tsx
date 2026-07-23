import { PROVIDERS } from "../../../constants";
import useEmvite from "../../../hooks/useEmvite";

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
      toast("Nomor rekening berhasil disalin");
    } catch (e) {
      console.error(e);
      toast("Tidak berhasil menyalin nomor rekening");
    }
  };

  const providerLogo = PROVIDERS.find((p) => p.name === providerName)?.logo
    .white;

  return (
    <div className="glass-card rounded-xl p-8 text-center snap-center min-w-[280px] flex-shrink-0">
      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-28 h-auto" />
        </div>
      ) : (
        <p className="text-sm mb-4" style={{ color: "#fef3c7" }}>
          {providerName}
        </p>
      )}

      <p
        className="mt-1 font-mono text-lg tracking-wider"
        style={{ color: "#fef3c7" }}
      >
        {accountNumber}
      </p>

      <p className="mt-2 text-sm" style={{ color: "#a1947b" }}>
        a.n. {recipient}
      </p>

      <button
        type="button"
        onClick={copyToClipboard}
        className="mt-6 w-full rounded-full border px-6 py-3 text-sm transition cursor-pointer"
        style={{
          borderColor: "#d4a853",
          color: "#d4a853",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d4a853";
          e.currentTarget.style.color = "#0a0e1a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#d4a853";
        }}
      >
        Salin Nomor Rekening
      </button>
    </div>
  );
};

export default function WeddingGiftSection() {
  const { data } = useEmvite();

  if (!data || data.giftInfos.length < 1) return null;

  return (
    <section
      id="gift"
      className="py-20"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="mb-12 px-6 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          Amplop Digital
        </h2>
        <p className="mx-auto max-w-md text-sm" style={{ color: "#94a3b8" }}>
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih
        </p>
      </div>

      <div className="px-6 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 gold-scrollbar justify-center">
        {data.giftInfos.map((gift, i) => (
          <GiftBox
            accountNumber={gift.accountNumber}
            providerName={gift.provider}
            recipient={gift.accountName}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
