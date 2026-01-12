import classNames from "classnames";

type EventProps = {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
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
        "bg-neutral-900 text-white shadow-xl": isMain,
        "bg-white text-neutral-900 border border-neutral-200": !isMain,
      })}
    >
      <h3
        className={classNames("mb-4 font-serif text-2xl", {
          "text-white": isMain,
          "text-neutral-800": !isMain,
        })}
      >
        {title}
      </h3>

      <div className="space-y-2 text-sm">
        <p
          className={classNames("", {
            "text-neutral-200": isMain,
            "text-neutral-600": !isMain,
          })}
        >
          {date}
        </p>
        <p
          className={classNames("", {
            "text-neutral-200": isMain,
            "text-neutral-600": !isMain,
          })}
        >
          {time}
        </p>
        <p className="font-medium">{venue}</p>
        <p
          className={classNames("text-xs", {
            "text-neutral-300": isMain,
            "text-neutral-500": !isMain,
          })}
        >
          {address}
        </p>
      </div>
    </div>
  );
}
