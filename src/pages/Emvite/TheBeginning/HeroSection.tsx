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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white overlay-white-bg bg-hero-1 bg-cover bg-top-right">
      {data && (
        <div className="relative z-10 px-6 text-center max-w-3xl">
          <p className="text-xs tracking-[0.35em] uppercase text-slate-600">
            Undangan Pernikahan
          </p>

          <h1 className="font-serif text-4xl md:text-6xl leading-tight mt-4 text-slate-900">
            {data.wedding.groomNickname || data.wedding.groomName}{" "}
            <span className="mx-2">&</span>{" "}
            {data.wedding.brideNickname || data.wedding.brideName}
          </h1>

          {mainEvent && (
            <p className="text-base md:text-lg tracking-wide text-slate-800 mt-4">
              {moment(mainEvent?.date || "2026-02-20").format("ddd, DD MMM Y")}
            </p>
          )}
          {data.guest && (
            <div className="flex justify-center mt-8">
              <div className="">
                <p className="text-xs uppercase tracking-widest text-slate-600">
                  Untuk
                </p>
                <p className="mt-1 text-lg font-medium text-slate-900">
                  {data.guest.name}
                </p>
              </div>
            </div>
          )}
          <div className="mx-auto mt-8 mb-10 h-px w-24 relative circle-divider">
            <div className="size-[10px] rounded-full bg-slate-600 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border text-slate-900 border-slate-900/70 px-8 py-3 text-sm tracking-wide transition hover:bg-slate-900 hover:text-slate-300 cursor-pointer"
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
