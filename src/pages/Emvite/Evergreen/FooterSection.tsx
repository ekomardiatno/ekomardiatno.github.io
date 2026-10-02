import useEmvite from "../../../hooks/useEmvite";

export default function FooterSection() {
  const { data } = useEmvite();
  return (
    <footer className="bg-emerald-950 px-6 py-16 text-emerald-100">
      <div className="mx-auto max-w-3xl text-center">
        {/* Divider */}
        <div className="mx-auto mb-8 h-px w-24 bg-emerald-800" />
        {data && (
          <>
            {/* Message */}
            <p className="mb-6 text-sm leading-relaxed text-emerald-200">
              Terima kasih atas doa, cinta, dan dukungan yang telah Anda
              berikan.
              <br />
              Kami sangat menantikan kehadiran Anda di hari bahagia kami.
            </p>

            {/* Names */}
            <h3 className="font-serif text-2xl text-amber-600">{`${data.wedding.groomName} & ${data.wedding.brideName}`}</h3>

            {/* Closing */}
            <p className="mt-4 text-xs tracking-wide text-emerald-400">
              Dengan penuh cinta dan rasa syukur
            </p>
          </>
        )}

        <p className="mt-6 text-xs text-emerald-700">
          &copy; 2026 EMVITE. Provided by Eko Mardiatno.
        </p>
      </div>
    </footer>
  );
}
