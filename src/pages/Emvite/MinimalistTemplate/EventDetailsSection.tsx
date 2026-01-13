import EventCard from "./EventCard";

export default function EventDetailsSection() {
  return (
    <section id="details" className="bg-slate-50 px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-3xl text-slate-900">
          Detail Acara
        </h2>
        <p className="text-sm text-slate-500">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <EventCard
          title="Resepsi Pernikahan"
          date="Sabtu, 20 September 2026"
          time="11:00 - 14:00"
          venue="Grand Ballroom Hotel"
          address="Jl. Example Street No. 123, Jakarta"
          isMain
        />
        <EventCard
          title="Akad Nikah"
          date="Sabtu, 20 September 2026"
          time="08:00 - 09:00"
          venue="Al-Hikmah Mosque"
          address="Jl. Example Street No. 45, Jakarta"
        />
      </div>
    </section>
  );
}
