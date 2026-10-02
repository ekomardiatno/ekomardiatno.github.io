import { useMemo } from "react";
import useEmvite from "../../../hooks/useEmvite";

export default function LocationSection() {
  const { data } = useEmvite();

  const mainEvent = useMemo(() => {
    if (!data || data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) || data.events[0];
  }, [data]);

  if (
    !mainEvent ||
    (!mainEvent.location && !mainEvent.address && !mainEvent.venue)
  )
    return null;

  return (
    <section
      id="location"
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
          Lokasi Acara
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Kami nantikan kehadiran Anda
        </p>
      </div>

      <div className="relative">
        {mainEvent.location && (
          <iframe
            src={`https://www.google.com/maps?q=${mainEvent.location
              .split(", ")
              .map((v) => v.trim())
              .join(",")}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full border-0"
            style={{ height: "400px" }}
            allowFullScreen
          />
        )}

        {/* Floating overlay card */}
        <div className="relative md:absolute md:bottom-6 md:left-6 md:max-w-sm">
          <div
            className="glass-card rounded-xl p-6 mx-6 md:mx-0 -mt-8 md:mt-0 relative z-10"
          >
            {mainEvent.venue && (
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: "#fef3c7" }}
              >
                {mainEvent.venue}
              </h3>
            )}
            {mainEvent.address && (
              <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
                {mainEvent.address}
              </p>
            )}
            {mainEvent.location && (
              <a
                href={`https://www.google.com/maps?q=${mainEvent.location
                  .split(", ")
                  .map((v) => v.trim())
                  .join(",")}`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm tracking-wide transition"
                style={{
                  backgroundColor: "#d4a853",
                  color: "#0a0e1a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e2bd6e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#d4a853";
                }}
              >
                Buka di Google Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
