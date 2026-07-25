import { useMemo } from "react";
import useEmvite from "../../../hooks/useEmvite";
import moment from "moment";

export default function HeroSection() {
  const { data } = useEmvite();

  const mainEvent = useMemo(() => {
    if (!data) return null;
    if (data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) ?? data.events[0];
  }, [data]);

  return (
    <section className="relative min-h-dvh flex flex-col justify-end overflow-hidden star-field">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0e1a 0%, #1a1040 40%, #0a0e1a 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, #0a0e1a)",
        }}
      />

      {data && (
        <div className="relative z-10 px-8 pb-16 md:pb-20 max-w-3xl">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: "#a1947b" }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-5xl md:text-7xl leading-tight"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: "#d4a853",
            }}
          >
            {data.wedding.groomNickname || data.wedding.groomName}
            <span className="block mt-2" style={{ color: "#fef3c7" }}>
              &amp;
            </span>
            {data.wedding.brideNickname || data.wedding.brideName}
          </h1>

          {mainEvent && (
            <p
              className="mt-6 text-sm tracking-[0.25em] uppercase"
              style={{ color: "#d4a853" }}
            >
              {moment(mainEvent?.date || "2026-02-20").format(
                "ddd, DD MMM Y",
              )}
            </p>
          )}

          {data.guest && (
            <div
              className="inline-block mt-8 px-6 py-2 rounded-full border"
              style={{ borderColor: "rgba(212, 168, 83, 0.3)" }}
            >
              <p className="text-sm" style={{ color: "#fef3c7" }}>
                {data.guest.name}
              </p>
            </div>
          )}

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-sm tracking-wide transition cursor-pointer"
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
              onClick={() => {
                document
                  .getElementById(mainEvent ? "countdown" : "couple")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Buka Undangan
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
