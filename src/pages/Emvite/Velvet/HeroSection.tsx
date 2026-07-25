import { useMemo, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import useTypewriter from './useTypewriter';
import moment from 'moment';

export default function HeroSection() {
  const { data } = useEmvite();
  const [opened, setOpened] = useState(false);

  const mainEvent = useMemo(() => {
    if (!data) return null;
    if (data.events.length < 1) return null;
    return data.events.find((ev) => ev.isMainEvent) ?? data.events[0];
  }, [data]);

  const groomName =
    data?.wedding.groomNickname || data?.wedding.groomName || '';
  const brideName =
    data?.wedding.brideNickname || data?.wedding.brideName || '';

  const { displayText: groomText, isComplete: groomDone } = useTypewriter(
    groomName,
    100,
    opened,
  );
  const { displayText: brideText, isComplete: brideDone } = useTypewriter(
    brideName,
    100,
    groomDone,
  );

  if (!data) return null;

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 velvet-mesh" />

      {/* Geometric decorations */}
      <div
        className="geo-circle"
        style={{ width: 300, height: 300, top: '-80px', right: '-80px' }}
      />
      <div
        className="geo-circle"
        style={{ width: 200, height: 200, bottom: '60px', left: '-60px' }}
      />
      <div
        className="geo-line"
        style={{ width: 1, height: 120, top: 40, left: '15%' }}
      />
      <div
        className="geo-line"
        style={{ width: 80, height: 1, bottom: 100, right: '10%' }}
      />

      {!opened ? (
        <div className="relative z-10 text-center px-6">
          {data.guest && (
            <div
              className="inline-block mb-6 px-5 py-1.5 rounded-full border"
              style={{ borderColor: 'rgba(233, 69, 96, 0.4)' }}
            >
              <p className="text-sm" style={{ color: '#b8c0d0' }}>
                Kepada Yth. {data.guest.name}
              </p>
            </div>
          )}

          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#6b7a99',
            }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-6xl md:text-8xl tracking-wider uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#ffffff',
            }}
          >
            {groomName}
            <span
              className="block text-2xl md:text-3xl my-2 tracking-[0.3em]"
              style={{ color: '#e94560' }}
            >
              &amp;
            </span>
            {brideName}
          </h1>

          {mainEvent && (
            <p
              className="mt-6 text-sm tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              {moment(mainEvent.date).format('ddd, DD MMM Y')}
            </p>
          )}

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-none px-10 py-3.5 text-sm uppercase tracking-[0.2em] transition cursor-pointer"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                backgroundColor: '#e94560',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c23152';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e94560';
              }}
              onClick={() => setOpened(true)}
            >
              Buka Undangan
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center px-6">
          {data.guest && (
            <div
              className="inline-block mb-6 px-5 py-1.5 rounded-full border velvet-fade-in"
              style={{ borderColor: 'rgba(233, 69, 96, 0.4)' }}
            >
              <p className="text-sm" style={{ color: '#b8c0d0' }}>
                Kepada Yth. {data.guest.name}
              </p>
            </div>
          )}

          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 velvet-fade-in"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#6b7a99',
              animationDelay: '0.2s',
            }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-6xl md:text-8xl tracking-wider uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#ffffff',
              minHeight: '1.2em',
            }}
          >
            {groomText}
            {!groomDone && <span className="typewriter-cursor" />}
          </h1>

          {groomDone && (
            <p
              className="text-2xl md:text-3xl tracking-[0.3em] my-2 velvet-fade-in"
              style={{ color: '#e94560' }}
            >
              &amp;
            </p>
          )}

          {groomDone && (
            <h1
              className="text-6xl md:text-8xl tracking-wider uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#ffffff',
                minHeight: '1.2em',
              }}
            >
              {brideText}
              {!brideDone && <span className="typewriter-cursor" />}
            </h1>
          )}

          {mainEvent && brideDone && (
            <p
              className="mt-6 text-sm tracking-[0.2em] uppercase velvet-fade-in"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#6b7a99',
              }}
            >
              {moment(mainEvent.date).format('ddd, DD MMM Y')}
            </p>
          )}

          {brideDone && (
            <div className="mt-10 velvet-fade-in" style={{ animationDelay: '0.3s' }}>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-none px-10 py-3.5 text-sm uppercase tracking-[0.2em] transition cursor-pointer border"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  borderColor: '#e94560',
                  color: '#e94560',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e94560';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#e94560';
                }}
                onClick={() => {
                  document
                    .getElementById(mainEvent ? 'countdown' : 'couple')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scroll ke bawah
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
