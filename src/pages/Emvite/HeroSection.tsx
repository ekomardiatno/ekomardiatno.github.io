
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900 text-white overlay-white-bg bg-hero-1 bg-cover bg-top-right">
      <div className="relative z-10 px-6 text-center max-w-3xl">
        <div className="mb-10 flex justify-center">
          <div className="rounded-2xl border border-neutral-400/30 bg-neutral-400/15 px-8 py-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-widest text-neutral-600">
              You are invited
            </p>
            <p className="mt-1 text-lg font-medium text-neutral-900">
              Guest Name
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs tracking-[0.35em] uppercase text-neutral-600">
          We Are Getting Married
        </p>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 text-neutral-900">
          John <span className="mx-2">&</span> Jane
        </h1>

        <p className="text-base md:text-lg tracking-wide text-neutral-800 mb-8">
          Saturday, 20 September 2026
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border text-neutral-900 border-neutral-900/70 px-8 py-3 text-sm tracking-wide transition hover:bg-neutral-900 hover:text-neutral-300 cursor-pointer"
          onClick={() => {
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View Invitation
        </button>
      </div>
    </section>
  );
}
