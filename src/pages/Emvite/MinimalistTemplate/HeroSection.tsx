export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white overlay-white-bg bg-hero-1 bg-cover bg-top-right">
      <div className="relative z-10 px-6 text-center max-w-3xl">
        <div className="flex justify-center">
          <div className="">
            <p className="text-xs uppercase tracking-widest text-slate-600">
              Undangan untuk Anda
            </p>
            <p className="mt-1 text-lg font-medium text-slate-900">
              Guest Name
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 mb-10 h-px w-24 relative circle-divider">
          <div className="size-[10px] rounded-full bg-slate-600 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        </div>
        <p className="mb-4 text-xs tracking-[0.35em] uppercase text-slate-600">
          Pernikahan kami
        </p>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 text-slate-900">
          John <span className="mx-2">&</span> Jane
        </h1>

        <p className="text-base md:text-lg tracking-wide text-slate-800 mb-8">
          Sabtu, 20 September 2026
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border text-slate-900 border-slate-900/70 px-8 py-3 text-sm tracking-wide transition hover:bg-slate-900 hover:text-slate-300 cursor-pointer"
          onClick={() => {
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
}
