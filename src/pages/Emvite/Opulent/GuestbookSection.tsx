import moment from 'moment';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createWish } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';
import { OrnamentDivider, CornerOrnament } from './Ornaments';
import useScrollReveal from './useScrollReveal';

export default function GuestbookSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const { data, pushWish, toast, mode } = useEmvite();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollReveal();

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
    <section
      id="guestbook"
      className="px-6 py-24 opulent-marble"
      ref={ref}
    >
      <div className="mb-12 text-center">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: '#1a1a1a',
          }}
        >
          Ucapan & Doa
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
          Kirimkan ucapan dan doa terbaik Anda
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-8">
        {/* Wishes list */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {data.wishes.length === 0 && (
            <div className="flex h-40 items-center justify-center text-center">
              <p
                className="text-sm italic"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  color: '#8a8a8a',
                }}
              >
                Belum ada ucapan.
                <br />
                Jadilah yang pertama menuliskan doa.
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className={`relative p-6 op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
              style={{
                transitionDelay: `${index * 0.1}s`,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(184, 134, 11, 0.12)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-3 left-4 text-3xl leading-none select-none"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  color: 'rgba(184, 134, 11, 0.15)',
                }}
              >
                &ldquo;
              </span>

              <div className="pl-5">
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    color: '#4a4a4a',
                    fontWeight: 300,
                  }}
                >
                  {wish.message}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className="text-xs font-medium"
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      color: '#b8860b',
                    }}
                  >
                    — {wish.guestName}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      color: '#8a8a8a',
                    }}
                  >
                    {moment(wish.createdAt).format('DD MMM, HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          className={`relative p-8 op-reveal op-reveal-up ${isVisible ? 'op-visible' : ''}`}
          style={{
            transitionDelay: '0.3s',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(184, 134, 11, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          <form onSubmit={submitWish} className="space-y-4">
            <div>
              <label
                className="mb-2 block text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#4a4a4a',
                }}
              >
                Nama
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
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
                  e.currentTarget.style.borderColor =
                    'rgba(184, 134, 11, 0.15)';
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: '#4a4a4a',
                }}
              >
                Ucapan
              </label>
              <textarea
                placeholder="Tuliskan ucapan dan doa..."
                rows={3}
                className="w-full px-4 py-3 text-sm focus:outline-none transition resize-none"
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
                  e.currentTarget.style.borderColor =
                    'rgba(184, 134, 11, 0.15)';
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
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
              disabled={isSubmitting || mode === 'preview'}
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
    </section>
  );
}
