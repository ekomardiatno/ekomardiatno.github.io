import classNames from "classnames";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={classNames([
        "animate-spin rounded-full border-2 border-gray-300 border-t-gray-700 dark:border-gray-400 dark:border-t-gray-50",
        className,
      ])}
    ></div>
  );
}
