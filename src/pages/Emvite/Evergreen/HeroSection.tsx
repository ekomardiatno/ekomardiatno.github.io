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
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-emerald-900 text-white overlay-green-bg bg-hero-evergreen bg-cover bg-center">
      {data && (
        <div className="relative z-10 px-6 text-center max-w-3xl">
          <p className="text-xs tracking-[0.35em] uppercase text-emerald-700">
            Undangan Pernikahan
          </p>

          <h1 className="font-serif text-4xl md:text-6xl leading-tight mt-4 text-emerald-800">
            {data.wedding.groomNickname || data.wedding.groomName}{" "}
            <span className="mx-2 text-amber-600">&</span>{" "}
            {data.wedding.brideNickname || data.wedding.brideName}
          </h1>

          {mainEvent && (
            <p className="text-base md:text-lg tracking-wide text-stone-700 mt-4">
              {moment(mainEvent?.date || "2026-02-20").format("ddd, DD MMM Y")}
            </p>
          )}
          {data.guest && (
            <div className="flex justify-center mt-8">
              <div className="">
                <p className="text-xs uppercase tracking-widest text-stone-500">
                  Untuk
                </p>
                <p className="mt-1 text-lg font-medium text-stone-800">
                  {data.guest.name}
                </p>
              </div>
            </div>
          )}
          <div className="mx-auto mt-8 mb-10 h-px w-24 bg-emerald-600/50" />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border text-emerald-800 border-emerald-800/70 px-8 py-3 text-sm tracking-wide transition hover:bg-emerald-800 hover:text-white cursor-pointer"
            onClick={() => {
              document
                .getElementById(mainEvent ? "countdown" : "couple")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Buka Undangan
          </button>
        </div>
      )}
    </section>
  );
}
