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
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-5xl md:text-7xl font-semibold gold-shimmer"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#d4a853",
        }}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span
        className="mt-2 text-xs uppercase tracking-[0.2em]"
        style={{ color: "#a1947b" }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <span
      className="text-3xl md:text-5xl self-start mt-2"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: "rgba(212, 168, 83, 0.3)",
      }}
    >
      /
    </span>
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
    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!mainEvent) return null;

  return (
    <section
      id="countdown"
      className="px-6 py-20 text-center"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <div className="mb-12">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          Menuju Hari Bahagia
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Kami tidak sabar untuk merayakannya bersama Anda
        </p>
      </div>

      <div className="mx-auto flex max-w-xl flex-wrap justify-center items-start gap-6 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Hari" />
        <Divider />
        <TimeUnit value={timeLeft.hours} label="Jam" />
        <Divider />
        <TimeUnit value={timeLeft.minutes} label="Menit" />
        <Divider />
        <TimeUnit value={timeLeft.seconds} label="Detik" />
      </div>
    </section>
  );
}
