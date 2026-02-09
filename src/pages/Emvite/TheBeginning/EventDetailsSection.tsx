import moment from "moment";
import useEmvite from "../../../hooks/useEmvite";
import EventCard from "./EventCard";
import classNames from "classnames";

export default function EventDetailsSection() {
  const { data } = useEmvite();

  if (!data || data.events.length < 1) return null;
  return (
    <section id="details" className="bg-slate-50 px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-3xl text-slate-900">
          Detail Acara
        </h2>
        <p className="text-sm text-slate-500">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div
        className={classNames("mx-auto grid max-w-4xl gap-8", {
          "md:grid-cols-2": data.events.length > 1,
        })}
      >
        {data.events.map((event) => {
          return (
            <EventCard
              title={event.title}
              date={moment(event.date).format("ddd, DD MMM Y")}
              time={`${event.startTime.split(":").slice(0, 2).join(":")} - ${event.endTime.split(":").slice(0, 2).join(":")}`}
              venue={event.venue}
              address={event.address}
              isMain={event.isMainEvent}
            />
          );
        })}
      </div>
    </section>
  );
}
