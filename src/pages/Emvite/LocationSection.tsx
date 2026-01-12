type LocationProps = {
  venue: string;
  address: string;
  mapEmbedUrl: string;
  mapUrl: string;
};
export default function LocationSection() {
  const location: LocationProps = {
    venue: "Grand Ballroom Hotel",
    address: "Jl. Example Street No. 123, Jakarta, Indonesia.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126914.18738642747!2d106.6584491729736!3d-6.254725023246623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14c3a0aba87%3A0x984c1ecec6ecb6f0!2sThe%20Opus%20Grand%20Ballroom!5e0!3m2!1sid!2sid!4v1768235276184!5m2!1sid!2sid",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Grand+Ballroom+Hotel+Jakarta",
  };

  return (
    <section id="location" className="bg-white px-6 py-20 text-neutral-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Location</h2>
        <p className="text-sm text-neutral-500">
          We look forward to welcoming you
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium">{location.venue}</h3>
          <p className="text-sm text-neutral-600">{location.address}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200">
          <iframe
            src={location.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0"
            allowFullScreen
          />
        </div>

        <div className="text-center">
          <a
            href={location.mapUrl}
            target="_blank"
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-8 py-3 text-sm tracking-wide transition hover:bg-neutral-900 hover:text-white"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
