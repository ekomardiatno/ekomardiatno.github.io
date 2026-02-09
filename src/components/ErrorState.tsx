import classNames from "classnames";

export default function ErrorState({
  mode = "screen",
  onRetry,
  retryLabel = "Retry",
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
}: {
  mode?: "screen" | "component";
  onRetry?: () => void;
  retryLabel?: string;
  title?: string;
  message?: string;
}) {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center text-center px-6",
        {
          "h-screen": mode === "screen",
          grow: mode === "component",
        },
      )}
    >
      <div className="mb-4 text-red-500 dark:text-red-400">
        <svg
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
          />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>

      {onRetry && (
        <button
          className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm text-white
           hover:bg-gray-800
           dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
