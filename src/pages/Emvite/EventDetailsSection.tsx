import EventCard from "./EventCard";

export default function EventDetailsSection() {
  return (
    <section id="details" className="bg-neutral-50 px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-3xl text-neutral-900">
          Wedding Events
        </h2>
        <p className="text-sm text-neutral-500">
          Kindly join us on our special day
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <EventCard
          title="Wedding Reception"
          date="Saturday, 20 September 2026"
          time="11:00 - 14:00"
          venue="Grand Ballroom Hotel"
          address="Jl. Example Street No. 123, Jakarta"
          isMain
        />
        <EventCard
          title="Wedding Ceremony"
          date="Saturday, 20 September 2026"
          time="08:00 - 09:00"
          venue="Al-Hikmah Mosque"
          address="Jl. Example Street No. 45, Jakarta"
        />
      </div>
    </section>
  );
}
