import moment from "moment";
import useEmvite from "../../../hooks/useEmvite";
import EventCard from "./EventCard";

export default function EventDetailsSection() {
  const { data } = useEmvite();

  if (!data || data.events.length < 1) return null;

  return (
    <section
      id="details"
      className="px-6 py-20"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <div className="mb-16 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          Detail Acara
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Center timeline line - desktop only */}
        <div className="hidden md:block timeline-line" />

        {/* Mobile left line */}
        <div
          className="md:hidden absolute left-[5px] top-0 bottom-0 w-px"
          style={{ backgroundColor: "rgba(212, 168, 83, 0.3)" }}
        />

        <div className="space-y-8">
          {data.events.map((event, index) => (
            <div
              key={index}
              className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 md:items-center"
            >
              {/* Desktop layout: alternating left/right */}
              <div
                className={`hidden md:block ${
                  index % 2 === 0 ? "order-1" : "order-3"
                }`}
              >
                <EventCard
                  title={event.title}
                  date={moment(event.date).format("ddd, DD MMM Y")}
                  time={`${event.startTime.split(":").slice(0, 2).join(":")} - ${event.endTime.split(":").slice(0, 2).join(":")}`}
                  venue={event.venue}
                  address={event.address}
                  isMain={event.isMainEvent}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              </div>

              {/* Desktop center dot */}
              <div className="hidden md:flex order-2 justify-center">
                <div
                  className={`rounded-full border-2 border-[#d4a853] ${
                    event.isMainEvent
                      ? "w-4 h-4 bg-[#d4a853]"
                      : "w-3 h-3 bg-transparent"
                  }`}
                />
              </div>

              {/* Desktop spacer for opposite side */}
              <div
                className={`hidden md:block ${
                  index % 2 === 0 ? "order-3" : "order-1"
                }`}
              />

              {/* Mobile layout: all stacked to the right of line */}
              <div className="md:hidden pl-6">
                <div
                  className={`absolute left-0 top-6 rounded-full border-2 border-[#d4a853] ${
                    event.isMainEvent
                      ? "w-3 h-3 bg-[#d4a853]"
                      : "w-3 h-3 bg-transparent"
                  }`}
                />
                <div className="glass-card rounded-xl p-6">
                  <h3
                    className="mb-3 text-xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: event.isMainEvent ? "#d4a853" : "#fef3c7",
                    }}
                  >
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p style={{ color: "#94a3b8" }}>
                      {moment(event.date).format("ddd, DD MMM Y")}
                    </p>
                    <p style={{ color: "#94a3b8" }}>
                      {`${event.startTime.split(":").slice(0, 2).join(":")} - ${event.endTime.split(":").slice(0, 2).join(":")}`}
                    </p>
                    {event.venue && (
                      <p
                        className="font-medium"
                        style={{ color: "#fef3c7" }}
                      >
                        {event.venue}
                      </p>
                    )}
                    {event.address && (
                      <p className="text-xs" style={{ color: "#a1947b" }}>
                        {event.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
