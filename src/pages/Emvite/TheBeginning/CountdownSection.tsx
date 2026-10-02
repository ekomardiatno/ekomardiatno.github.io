import { useEffect, useMemo, useState } from "react";
import useEmvite from "../../../hooks/useEmvite";

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
    <div className="flex flex-col items-center rounded-xl bg-white px-5 py-4 shadow-sm flex-[85px] grow-0">
      <span className="text-2xl font-semibold text-slate-900">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const { data } = useEmvite();

  const mainEvent = useMemo(() => {
    if (!data || data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) || data.events[0];
  }, [data]);

  const weddingDate = useMemo(() => {
    let date = new Date(new Date().getTime() + 100 * 24 * 60 * 60 * 1000);
    if (mainEvent) {
      const splittedStartTime = mainEvent.startTime
        .split(":")
        .map((v) => Number(v.trim()));
      date = new Date(
        new Date(mainEvent.date).setHours(
          splittedStartTime[0],
          splittedStartTime[1],
          splittedStartTime[2],
          0,
        ),
      );
    }
    return date;
  }, [mainEvent]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(weddingDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    });
    return () => {
      clearInterval(timer);
    };
  }, [weddingDate]);

  if (!mainEvent) {
    return null;
  }

  return (
    <section id="countdown" className="px-6 py-20 text-center">
      <div className="mb-12">
        <h2 className="mb-4 font-serif text-3xl text-slate-900">
          Menuju Hari Bahagia Kami
        </h2>
        <p className="text-sm text-slate-500">
          Kami tidak sabar untuk merayakannya bersama Anda
        </p>
      </div>

      <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-4">
        <TimeBox value={timeLeft.days} label="Hari" />
        <TimeBox value={timeLeft.hours} label="Jam" />
        <TimeBox value={timeLeft.minutes} label="Menit" />
        <TimeBox value={timeLeft.seconds} label="Detik" />
      </div>
    </section>
  );
}
