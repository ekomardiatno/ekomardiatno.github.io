import classNames from "classnames";

type EventProps = {
  title: string;
  date: string;
  time: string;
  venue: string | null;
  address: string | null;
  isMain?: boolean;
};

export default function EventCard({
  title,
  date,
  time,
  address,
  venue,
  isMain,
}: EventProps) {
  return (
    <div
      className={classNames("rounded-2xl p-8 text-center transition", {
        "bg-emerald-800 text-white shadow-xl": isMain,
        "bg-white text-stone-800 border-l-4 border-emerald-600": !isMain,
      })}
    >
      <h3
        className={classNames("mb-4 font-serif text-2xl", {
          "text-white": isMain,
          "text-emerald-800": !isMain,
        })}
      >
        {title}
      </h3>

      <div className="space-y-2 text-sm">
        <p
          className={classNames("", {
            "text-emerald-100": isMain,
            "text-stone-500": !isMain,
          })}
        >
          {date}
        </p>
        <p
          className={classNames("", {
            "text-emerald-100": isMain,
            "text-stone-500": !isMain,
          })}
        >
          {time}
        </p>
        {venue && <p className="font-medium">{venue}</p>}
        {address && (
          <p
            className={classNames("text-xs", {
              "text-emerald-200": isMain,
              "text-stone-400": !isMain,
            })}
          >
            {address}
          </p>
        )}
      </div>
    </div>
  );
}
