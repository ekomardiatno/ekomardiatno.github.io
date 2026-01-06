import { useEffect, useState } from "react";
import classNames from "classnames";

export default function NavigationHeader() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (win) => {
      setScrollY((win.currentTarget as Window).scrollY);
    });
  });

  return (
    <nav className={classNames("bg-transparent fixed text-white top-0 w-full z-1000 transition-all", {
      'bg-white/15 backdrop-blur-sm shadow-md': scrollY > 50,
    })}>
      <div className={classNames("max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-all", {
        'py-4!': scrollY > 50,
      })}>
        <h1 className="text-xl">EMDEV</h1>
      </div>
    </nav>
  );
}
