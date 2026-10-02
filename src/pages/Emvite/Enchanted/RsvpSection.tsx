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

  return (
    <section id="rsvp" className="px-6 py-20" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Konfirmasi Kehadiran
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Mohon konfirmasi kehadiran Anda
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <div
          className={`rounded-2xl p-8 reveal reveal-up ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundColor: '#fff5f5',
            boxShadow: '0 8px 32px rgba(183, 110, 121, 0.1)',
            border: '1px solid rgba(183, 110, 121, 0.15)',
          }}
        >
          <form className="space-y-6">
            <div>
              <label
                className="mb-3 block text-sm"
                style={{ color: '#2d2020' }}
              >
                Apakah Anda akan hadir?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={classNames(
                    'flex-1 rounded-full border px-4 py-3 text-sm transition cursor-pointer',
                  )}
                  style={
                    (attendance ?? statusAttandance) === 'attending'
                      ? {
                          backgroundColor: '#b76e79',
                          borderColor: '#b76e79',
                          color: '#fdf8f4',
                        }
                      : {
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(183, 110, 121, 0.3)',
                          color: '#6b5b5b',
                        }
                  }
                >
                  Ya, saya akan hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not_attending')}
                  className={classNames(
                    'flex-1 rounded-full border px-4 py-3 text-sm transition cursor-pointer',
                  )}
                  style={
                    (attendance ?? statusAttandance) === 'not_attending'
                      ? {
                          backgroundColor: '#b76e79',
                          borderColor: '#b76e79',
                          color: '#fdf8f4',
                        }
                      : {
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(183, 110, 121, 0.3)',
                          color: '#6b5b5b',
                        }
                  }
                >
                  Maaf, tidak bisa
                </button>
              </div>
            </div>
            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: '#2d2020' }}
              >
                Ucapan (opsional)
              </label>
              <textarea
                name="rsvpMessage"
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa..."
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
                style={{
                  backgroundColor: '#fdf8f4',
                  borderColor: 'rgba(183, 110, 121, 0.2)',
                  color: '#2d2020',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#b76e79';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(183, 110, 121, 0.2)';
                }}
                value={message || data.rsvp?.message || ''}
              />
            </div>

            <button
              type="button"
              className="w-full rounded-full px-6 py-4 text-sm tracking-wide transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: '#b76e79',
                color: '#fdf8f4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#9c5c66';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#b76e79';
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
