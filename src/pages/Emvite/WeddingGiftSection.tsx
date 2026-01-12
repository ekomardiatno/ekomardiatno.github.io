export default function WeddingGiftSection() {
  const gift = {
    title: "Wedding Gift",
    message:
      "Your presence is the greatest gift. However, if you wish to give something, we would be truly grateful.",
    recipient: "Eko Mardiatno",
    bankName: "Bank Example",
    accountNumber: "1234567890",
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(gift.accountNumber);
  };

  return (
    <section id="gift" className="bg-neutral-50 px-6 py-20 text-neutral-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">{gift.title}</h2>
        <p className="mx-auto max-w-full text-sm text-neutral-500">
          {gift.message}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm only:col-span-2 only:justify-self-center">
          <p className="text-sm text-neutral-600">{gift.bankName}</p>

          <p className="mt-1 font-mono text-lg tracking-wider">
            {gift.accountNumber}
          </p>

          <p className="mt-2 text-sm text-neutral-500">a.n. {gift.recipient}</p>

          <button
            type="button"
            onClick={copyToClipboard}
            className="mt-6 w-full rounded-full border border-neutral-900 px-6 py-3 text-sm transition hover:bg-neutral-900 hover:text-white cursor-pointer"
          >
            Copy Account Number
          </button>
        </div>
      </div>
    </section>
  );
}
