import moment from 'moment';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createWish } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';

export default function GuestbookPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, pushWish, toast, mode } = useEmvite();

  const submitWish = (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'preview') {
      toast('Tidak bisa mengirim ucapan di mode ini');
      return;
    }
    if (!name || !message) {
      toast('Wajib memasukkan nama dan ucapan');
      return;
    }
    setIsSubmitting(true);
  };

  const fetchSubmit = useCallback(
    async (signal?: AbortSignal) => {
      if (!data?.invitationId) {
        setIsSubmitting(false);
        return;
      }
      try {
        const res = await createWish(
          {
            invitationId: data.invitationId,
            guestName: name,
            message: message,
          },
          signal,
        );
        if (res.status >= 200 && res.status < 300 && res.data) {
          pushWish(res.data);
          setIsSubmitting(false);
          setName('');
          setMessage('');
        } else {
          throw new Error(res.message || 'Failed to send wish');
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
    [data?.invitationId, message, name, pushWish, toast],
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
          Ucapan &amp; Doa
        </h2>

        <p
          className="memoir-reveal text-xs text-center mb-6"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(240, 236, 228, 0.4)',
            transitionDelay: '0.08s',
          }}
        >
          Kirimkan ucapan dan doa terbaik Anda
        </p>

        {/* Wishes list */}
        <div
          className="memoir-reveal w-full space-y-3 max-h-[280px] overflow-y-auto memoir-page-scrollable pr-1 mb-6"
          style={{ transitionDelay: '0.16s' }}
        >
          {data.wishes.length === 0 && (
            <div className="flex h-24 items-center justify-center">
              <p
                className="text-xs italic"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: 'rgba(240, 236, 228, 0.3)',
                }}
              >
                Belum ada ucapan. Jadilah yang pertama.
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className="p-4"
              style={{
                borderLeft: '2px solid rgba(200, 149, 108, 0.25)',
                backgroundColor: 'rgba(30, 28, 25, 0.5)',
              }}
            >
              <p
                className="text-sm leading-relaxed mb-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.7)',
                  fontWeight: 300,
                }}
              >
                {wish.message}
              </p>
              <div className="flex items-center justify-between">
                <p
                  className="text-[10px] font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#c8956c',
                  }}
                >
                  — {wish.guestName}
                </p>
                <p
                  className="text-[9px]"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(240, 236, 228, 0.25)',
                  }}
                >
                  {moment(wish.createdAt).format('DD MMM, HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          className="memoir-reveal w-full memoir-surface p-6"
          style={{ transitionDelay: '0.24s' }}
        >
          <form
            onSubmit={submitWish}
            className="space-y-4"
            data-memoir-interactive
          >
            <div>
              <label
                className="mb-2 block text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.5)',
                }}
              >
                Nama
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full px-4 py-2.5 text-sm focus:outline-none transition"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-memoir-interactive
              />
            </div>
            <div>
              <label
                className="mb-2 block text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(240, 236, 228, 0.5)',
                }}
              >
                Ucapan
              </label>
              <textarea
                placeholder="Tuliskan ucapan dan doa..."
                rows={3}
                className="w-full px-4 py-2.5 text-sm focus:outline-none transition resize-none"
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-memoir-interactive
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-xs uppercase tracking-[0.25em] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
              disabled={isSubmitting || mode === 'preview'}
              data-memoir-interactive
            >
              {isSubmitting ? (
                <Spinner className="size-[15.5px] inline-block" />
              ) : (
                'Kirim Ucapan'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
