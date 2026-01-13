export default function FooterSection() {
  return (
    <footer className="bg-slate-900 px-6 py-16 text-slate-200">
      <div className="mx-auto max-w-3xl text-center">
        {/* Divider */}
        <div className="mx-auto mb-8 h-px w-24 bg-slate-700" />

        {/* Message */}
        <p className="mb-6 text-sm leading-relaxed text-slate-300">
          Terima kasih atas doa, cinta, dan dukungan yang telah Anda berikan.
          <br />
          Kami sangat menantikan kehadiran Anda di hari bahagia kami.
        </p>

        {/* Names */}
        <h3 className="font-serif text-2xl text-white">John & Jane</h3>

        {/* Closing */}
        <p className="mt-4 text-xs tracking-wide text-slate-500">
          Dengan penuh cinta dan rasa syukur
        </p>
        <p className="mt-6 text-xs text-slate-600">© 2026 EMVITE. Provided by Eko Mardiatno.</p>
      </div>
    </footer>
  );
}
