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

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm only:col-span-2 only:justify-self-center">
      <p className="text-sm text-slate-600">{providerName}</p>

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
  const gifts: Gift[] = [
    {
      recipient: "Eko Mardiatno",
      providerName: "Bank Example",
      accountNumber: "1234567890",
    },
  ];

  return (
    <section id="gift" className="bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Amplop Digital</h2>
        <p className="mx-auto max-w-full text-sm text-slate-500">
          Kehadiran Anda merupakan hadiah terindah bagi kami. Namun, apabila
          berkenan memberikan tanda kasih, kami sangat berterima kasih˝
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {gifts.map((gift, i) => (
          <GiftBox
            accountNumber={gift.accountNumber}
            providerName={gift.providerName}
            recipient={gift.recipient}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
