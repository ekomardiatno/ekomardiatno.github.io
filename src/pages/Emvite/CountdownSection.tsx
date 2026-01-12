import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - new Date().getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-5 py-4 shadow-sm">
      <span className="text-2xl font-semibold text-neutral-900">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const weddingDate = useMemo(() => new Date("2026-09-20T08:00:00"), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(weddingDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    });
    return () => {
      clearInterval(timer);
    };
  }, [weddingDate]);

  return (
    <section id="countdown" className="px-6 py-20 text-center">
      <div className="mb-12">
        <h2 className="mb-4 font-serif text-3xl text-neutral-900">
          Counting Down to Our Big Day
        </h2>
        <p className="text-sm text-neutral-500">
          We can't wait to celebrate with you
        </p>
      </div>

      <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-4">
        <TimeBox value={timeLeft.days} label="Day(s)" />
        <TimeBox value={timeLeft.hours} label="Hour(s)" />
        <TimeBox value={timeLeft.minutes} label="Minute(s)" />
        <TimeBox value={timeLeft.seconds} label="Second(s)" />
      </div>
    </section>
  );
}
