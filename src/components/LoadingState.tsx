import classNames from "classnames";
import Spinner from "./Spinner";

export default function LoadingState({
  mode = "screen",
}: {
  mode?: "screen" | "component";
}) {
  return (
    <div
      className={classNames("flex items-center justify-center", {
        "h-screen": mode === "screen",
        grow: mode === "component",
      })}
    >
      <Spinner className="size-8" />
    </div>
  );
}
