import useEmvite from "../../../hooks/useEmvite";

export default function FooterSection() {
  const { data } = useEmvite();

  const groomInitial = data?.wedding.groomNickname?.charAt(0) || data?.wedding.groomName?.charAt(0) || "";
  const brideInitial = data?.wedding.brideNickname?.charAt(0) || data?.wedding.brideName?.charAt(0) || "";

  return (
    <footer
      className="px-6 py-16"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Gold divider */}
        <div
          className="mx-auto mb-10 h-px w-24"
          style={{ backgroundColor: "rgba(212, 168, 83, 0.3)" }}
        />

        {data && (
          <>
            {/* Monogram initials */}
            <h2
              className="text-6xl md:text-7xl mb-6 gold-shimmer"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: "#d4a853",
              }}
            >
              {groomInitial} & {brideInitial}
            </h2>

            {/* Thank you message */}
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: "#a1947b" }}
            >
              Terima kasih atas doa, cinta, dan dukungan yang telah Anda
              berikan.
              <br />
              Kami sangat menantikan kehadiran Anda di hari bahagia kami.
            </p>

            {/* Divider */}
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ backgroundColor: "rgba(212, 168, 83, 0.3)" }}
            />

            <p
              className="text-xs tracking-wide"
              style={{ color: "#94a3b8" }}
            >
              Dengan penuh cinta dan rasa syukur
            </p>
          </>
        )}

        <p className="mt-8 text-xs" style={{ color: "#334155" }}>
          &copy; 2026 EMVITE. Provided by Eko Mardiatno.
        </p>
      </div>
    </footer>
  );
}
