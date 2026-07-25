import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createRsvp } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';
import useScrollReveal from './useScrollReveal';

export default function RsvpSection() {
  const [attendance, setAttendance] = useState<
    'attending' | 'not_attending' | null
  >(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = () => {
    setIsSubmitting(true);
  };

  if (!data) return null;

  const currentAttendance = attendance ?? statusAttandance;

  return (
    <section
      id="rsvp"
      className="px-6 py-24"
      style={{ backgroundColor: '#1a1a2e' }}
      ref={ref}
    >
      <div className="mb-12 text-center">
        <h2
          className="text-3xl md:text-4xl tracking-wider uppercase mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#ffffff',
          }}
        >
          Konfirmasi Kehadiran
        </h2>
        <div
          className="mx-auto w-12 h-[2px] mb-4"
          style={{ backgroundColor: '#e94560' }}
        />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#6b7a99',
          }}
        >
          Mohon konfirmasi kehadiran Anda
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <div
          className={`p-8 v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
          style={{
            backgroundColor: '#16213e',
            borderTop: '2px solid #e94560',
          }}
        >
          <form className="space-y-6">
            <div>
              <label
                className="mb-3 block text-sm uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#b8c0d0',
                }}
              >
                Apakah Anda akan hadir?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={classNames(
                    'flex-1 px-4 py-3 text-sm uppercase tracking-[0.1em] transition cursor-pointer',
                  )}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    ...(currentAttendance === 'attending'
                      ? {
                          backgroundColor: '#e94560',
                          color: '#ffffff',
                          border: '1px solid #e94560',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: '#6b7a99',
                          border: '1px solid rgba(233, 69, 96, 0.25)',
                        }),
                  }}
                >
                  Ya, Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not_attending')}
                  className={classNames(
                    'flex-1 px-4 py-3 text-sm uppercase tracking-[0.1em] transition cursor-pointer',
                  )}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    ...(currentAttendance === 'not_attending'
                      ? {
                          backgroundColor: '#e94560',
                          color: '#ffffff',
                          border: '1px solid #e94560',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: '#6b7a99',
                          border: '1px solid rgba(233, 69, 96, 0.25)',
                        }),
                  }}
                >
                  Maaf, Tidak Bisa
                </button>
              </div>
            </div>
            <div>
              <label
                className="mb-2 block text-sm uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#b8c0d0',
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
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundColor: 'rgba(15, 52, 96, 0.5)',
                  border: '1px solid rgba(233, 69, 96, 0.15)',
                  color: '#ffffff',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#e94560';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(233, 69, 96, 0.15)';
                }}
                value={message || data.rsvp?.message || ''}
              />
            </div>

            <button
              type="button"
              className="w-full px-6 py-4 text-sm uppercase tracking-[0.2em] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
              onClick={onSubmit}
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
