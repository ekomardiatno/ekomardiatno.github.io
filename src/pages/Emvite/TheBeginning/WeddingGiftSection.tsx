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
    .regular;

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm only:col-span-2 only:justify-self-center">
      {providerLogo ? (
        <div className="flex items-center justify-center mb-4">
          <img src={providerLogo} className="w-28 h-auto" />
        </div>
      ) : (
        <p className="text-sm text-slate-600">{providerName}</p>
      )}

      <p className="mt-1 font-mono text-lg tracking-wider">{accountNumber}</p>

      <p className="mt-2 text-sm text-slate-500">a.n. {recipient}</p>

      <button
        type="button"
        onClick={copyToClipboard}
        className="mt-6 w-full rounded-full border border-slate-900 px-6 py-3 text-sm transition hover:bg-slate-900 hover:text-white cursor-pointer"
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
    <section id="gift" className="bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Amplop Digital</h2>
        <p className="mx-auto max-w-full text-sm text-slate-500">
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
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
