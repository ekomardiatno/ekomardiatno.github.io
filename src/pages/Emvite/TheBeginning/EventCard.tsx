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
        "bg-slate-900 text-white shadow-xl": isMain,
        "bg-white text-slate-900 border border-slate-200": !isMain,
      })}
    >
      <h3
        className={classNames("mb-4 font-serif text-2xl", {
          "text-white": isMain,
          "text-slate-800": !isMain,
        })}
      >
        {title}
      </h3>

      <div className="space-y-2 text-sm">
        <p
          className={classNames("", {
            "text-slate-200": isMain,
            "text-slate-600": !isMain,
          })}
        >
          {date}
        </p>
        <p
          className={classNames("", {
            "text-slate-200": isMain,
            "text-slate-600": !isMain,
          })}
        >
          {time}
        </p>
        {venue && <p className="font-medium">{venue}</p>}
        {address && (
          <p
            className={classNames("text-xs", {
              "text-slate-300": isMain,
              "text-slate-500": !isMain,
            })}
          >
            {address}
          </p>
        )}
      </div>
    </div>
  );
}
