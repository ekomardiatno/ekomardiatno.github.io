import classNames from "classnames";

type EventProps = {
  title: string;
  date: string;
  time: string;
  venue: string | null;
  address: string | null;
  isMain?: boolean;
  position: "left" | "right";
};

export default function EventCard({
  title,
  date,
  time,
  address,
  venue,
  isMain,
  position,
}: EventProps) {
  return (
    <div
      className={classNames("relative flex items-center gap-4 md:gap-6", {
        "md:flex-row-reverse": position === "left",
      })}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <div
          className={classNames("rounded-full border-2", {
            "w-4 h-4 border-[#d4a853] bg-[#d4a853]": isMain,
            "w-3 h-3 border-[#d4a853] bg-transparent": !isMain,
          })}
        />
      </div>

      {/* Mobile dot */}
      <div className="flex md:hidden flex-col items-center flex-shrink-0">
        <div
          className={classNames("rounded-full border-2", {
            "w-4 h-4 border-[#d4a853] bg-[#d4a853]": isMain,
            "w-3 h-3 border-[#d4a853] bg-transparent": !isMain,
          })}
        />
      </div>

      {/* Card */}
      <div
        className={classNames(
          "glass-card rounded-xl p-6 flex-1",
          {
            "md:text-right": position === "left",
            "md:text-left": position === "right",
          },
        )}
      >
        <h3
          className="mb-3 text-xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: isMain ? "#d4a853" : "#fef3c7",
          }}
        >
          {title}
        </h3>

        <div className="space-y-1 text-sm">
          <p style={{ color: "#94a3b8" }}>{date}</p>
          <p style={{ color: "#94a3b8" }}>{time}</p>
          {venue && (
            <p className="font-medium" style={{ color: "#fef3c7" }}>
              {venue}
            </p>
          )}
          {address && (
            <p className="text-xs" style={{ color: "#a1947b" }}>
              {address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
