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
    <section id="location" className="bg-white px-6 py-20 text-slate-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Lokasi Acara</h2>
        <p className="text-sm text-slate-500">Kami nantikan kehadiran Anda</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col items-center gap-2">
          {mainEvent.venue && (
            <h3 className="text-lg font-medium">{mainEvent.venue}</h3>
          )}
          {mainEvent.address && (
            <p className="text-sm text-slate-600">{mainEvent.address}</p>
          )}
        </div>

        {mainEvent.location && (
          <>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                src={`https://www.google.com/maps?q=${mainEvent.location
                  .split(", ")
                  .map((v) => v.trim())
                  .join(",")}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0"
                allowFullScreen
              />
            </div>

            <div className="text-center">
              <a
                href={`https://www.google.com/maps?q=${mainEvent.location
                  .split(", ")
                  .map((v) => v.trim())
                  .join(",")}`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 px-8 py-3 text-sm tracking-wide transition hover:bg-slate-900 hover:text-white"
              >
                Buka di Google Maps
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
