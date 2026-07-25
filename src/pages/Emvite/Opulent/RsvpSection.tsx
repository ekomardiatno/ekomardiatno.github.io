import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createRsvp } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';
import { OrnamentDivider, CornerOrnament } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function RsvpSection() {
  const [attendance, setAttendance] = useState<
    'attending' | 'not_attending' | null
  >(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const { data, patchRsvp, toast, mode } = useEmvite();
  const { ref, isVisible } = useScrollReveal();

  const statusAttandance =
    data?.rsvp?.status === 'maybe' ? null : data?.rsvp?.status || null;

  const fetchSubmit = useCallback(
    async (signal?: AbortSignal) => {
      if (!data?.guest) {
        setIsSubmitting(false);
        return;
      }
      try {
        const res = await createRsvp(
          {
            guestId: data.guest.id,
            message: message || data.rsvp?.message || null,
            status: attendance || data.rsvp?.status || null,
          },
          signal,
        );
        if (res.status >= 200 && res.status < 300 && res.data) {
          patchRsvp({
            createdAt: res.data.createdAt,
            guestId: res.data.guestId,
            message: res.data.message,
            status: res.data.status,
          });
          setAttendance(null);
          setMessage('');
          setIsSubmitting(false);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 2000);
        } else {
          throw new Error(res.message || 'Failed to create/update RSVP');
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== 'canceled') ||
          (e as ApiError).message
        ) {
          toast((e as Error | ApiError).message);
        }
        setIsSubmitting(false);
      }
    },
    [
      attendance,
      data?.guest,
      data?.rsvp?.message,
      data?.rsvp?.status,
      message,
      patchRsvp,
      toast,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isSubmitting) {
      fetchSubmit(controller.signal);
    } else {
      controller.abort();
    }
  }, [isSubmitting, fetchSubmit]);

  if (!data) return null;

  const currentAttendance = attendance ?? statusAttandance;

  return (
    <section id="rsvp" className="px-6 py-24 opulent-marble" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Konfirmasi Kehadiran
        </h2>
        <OrnamentDivider className="mb-4" />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#8a8a8a',
            fontWeight: 300,
          }}
        >
          Mohon konfirmasi kehadiran Anda
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <div
          className={`relative p-10 op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(184, 134, 11, 0.2)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
          }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {/* Celebration sparkles */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${10 + (i * 73) % 80}%`,
                    top: `${20 + (i * 37) % 30}%`,
                    backgroundColor: i % 3 === 0 ? '#b8860b' : i % 3 === 1 ? '#d4af37' : '#1b4332',
                    animationDelay: `${i * 0.08}s`,
                    borderRadius: i % 2 === 0 ? '50%' : '0',
                  }}
                />
              ))}
            </div>
          )}

          <form className="space-y-6">
            <div>
              <label
                className="mb-3 block text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#4a4a4a',
                }}
              >
                Apakah Anda akan hadir?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={classNames(
                    'flex-1 px-4 py-3.5 text-xs uppercase tracking-[0.15em] transition cursor-pointer',
                  )}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    ...(currentAttendance === 'attending'
                      ? {
                          backgroundColor: '#b8860b',
                          border: '1px solid #b8860b',
                          color: '#f5f0eb',
                        }
                      : {
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(184, 134, 11, 0.25)',
                          color: '#4a4a4a',
                        }),
                  }}
                >
                  Ya, Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not_attending')}
                  className={classNames(
                    'flex-1 px-4 py-3.5 text-xs uppercase tracking-[0.15em] transition cursor-pointer',
                  )}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    ...(currentAttendance === 'not_attending'
                      ? {
                          backgroundColor: '#b8860b',
                          border: '1px solid #b8860b',
                          color: '#f5f0eb',
                        }
                      : {
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(184, 134, 11, 0.25)',
                          color: '#4a4a4a',
                        }),
                  }}
                >
                  Maaf, Tidak Bisa
                </button>
              </div>
            </div>
            <div>
              <label
                className="mb-2 block text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#4a4a4a',
                }}
              >
                Ucapan (opsional)
              </label>
              <textarea
                name="rsvpMessage"
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa..."
                className="w-full px-4 py-3 text-sm focus:outline-none transition"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  backgroundColor: '#faf6f1',
                  border: '1px solid rgba(184, 134, 11, 0.15)',
                  color: '#1a1a1a',
                  fontWeight: 300,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#b8860b';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.15)';
                }}
                value={message || data.rsvp?.message || ''}
              />
            </div>

            <button
              type="button"
              className="w-full px-6 py-4 text-xs uppercase tracking-[0.3em] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                backgroundColor: '#b8860b',
                color: '#f5f0eb',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#96700a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#b8860b';
              }}
              onClick={() => setIsSubmitting(true)}
              disabled={isSubmitting || mode === 'preview'}
            >
              {isSubmitting ? (
                <Spinner className="size-[15.5px] inline-block" />
              ) : (
                'Kirim Konfirmasi'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
