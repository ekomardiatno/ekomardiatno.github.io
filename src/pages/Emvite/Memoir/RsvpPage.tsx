import { useCallback, useEffect, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createRsvp } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';

export default function RsvpPage() {
  const [attendance, setAttendance] = useState<
    'attending' | 'not_attending' | null
  >(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const { data, patchRsvp, toast, mode } = useEmvite();

  const statusAttendance =
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

  const currentAttendance = attendance ?? statusAttendance;

  return (
    <div className="flex flex-col w-full h-full px-6 py-20">
      <div className="flex-1 flex flex-col items-center justify-start max-w-lg mx-auto w-full">
        <h2
          className="memoir-reveal text-center mb-2"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 400,
            color: '#f0ece4',
          }}
        >
          Konfirmasi Kehadiran
        </h2>

        <p
          className="memoir-reveal text-xs text-center mb-8"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.4)',
            transitionDelay: '0.08s',
          }}
        >
          Mohon konfirmasi kehadiran Anda
        </p>

        <div
          className="memoir-reveal relative w-full memoir-surface p-8"
          style={{ transitionDelay: '0.16s' }}
        >
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="memoir-celebrate text-4xl"
                role="img"
                aria-label="celebration"
              >
                &#10003;
              </span>
            </div>
          )}

          <form className="space-y-5" data-memoir-interactive>
            <div>
              <label
                className="mb-3 block text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.5)',
                }}
              >
                Apakah Anda akan hadir?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className="flex-1 px-4 py-3 text-xs uppercase tracking-[0.15em] transition cursor-pointer"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    ...(currentAttendance === 'attending'
                      ? {
                          backgroundColor: '#c8956c',
                          border: '1px solid #c8956c',
                          color: '#141210',
                        }
                      : {
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(200, 149, 108, 0.25)',
                          color: 'rgba(240, 236, 228, 0.6)',
                        }),
                  }}
                  data-memoir-interactive
                >
                  Ya, Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not_attending')}
                  className="flex-1 px-4 py-3 text-xs uppercase tracking-[0.15em] transition cursor-pointer"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    ...(currentAttendance === 'not_attending'
                      ? {
                          backgroundColor: '#c8956c',
                          border: '1px solid #c8956c',
                          color: '#141210',
                        }
                      : {
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(200, 149, 108, 0.25)',
                          color: 'rgba(240, 236, 228, 0.6)',
                        }),
                  }}
                  data-memoir-interactive
                >
                  Maaf, Tidak Bisa
                </button>
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.5)',
                }}
              >
                Ucapan (opsional)
              </label>
              <textarea
                name="rsvpMessage"
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa..."
                className="w-full px-4 py-3 text-sm focus:outline-none transition resize-none"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  backgroundColor: '#2a2723',
                  border: '1px solid rgba(200, 149, 108, 0.15)',
                  color: '#f0ece4',
                  fontWeight: 300,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c8956c';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(200, 149, 108, 0.15)';
                }}
                value={message || data.rsvp?.message || ''}
                data-memoir-interactive
              />
            </div>

            <button
              type="button"
              className="w-full px-6 py-3.5 text-xs uppercase tracking-[0.25em] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: '#c8956c',
                color: '#141210',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b07d56';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c8956c';
              }}
              onClick={() => setIsSubmitting(true)}
              disabled={isSubmitting || mode === 'preview'}
              data-memoir-interactive
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
    </div>
  );
}
