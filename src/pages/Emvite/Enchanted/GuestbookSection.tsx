import moment from 'moment';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import useEmvite from '../../../hooks/useEmvite';
import { createWish } from '../../../services/emvite.service';
import type { ApiError } from '../../../services/common';
import Spinner from '../../../components/Spinner';
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
    <section id="guestbook" className="px-6 py-20" ref={ref}>
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#2d2020',
          }}
        >
          Ucapan & Doa
        </h2>
        <p className="text-sm" style={{ color: '#9e8e8e' }}>
          Kirimkan ucapan dan doa terbaik Anda
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-12">
        {/* Form */}
        <div
          className={`rounded-2xl p-8 reveal reveal-up ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundColor: '#fff5f5',
            boxShadow: '0 8px 32px rgba(183, 110, 121, 0.1)',
            border: '1px solid rgba(183, 110, 121, 0.15)',
          }}
        >
          <form onSubmit={submitWish} className="space-y-6">
            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: '#2d2020' }}
              >
                Nama
              </label>
              <input
                type="text"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: '#2d2020' }}
              >
                Ucapan
              </label>
              <textarea
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
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

        {/* Wishes */}
        <div className="space-y-4">
          {data.wishes.length === 0 && (
            <div className="flex h-40 items-center justify-center text-center">
              <p className="text-sm" style={{ color: '#9e8e8e' }}>
                Belum ada ucapan.
                <br />
                Jadilah yang pertama
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 reveal reveal-up ${isVisible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${(index + 1) * 0.1}s`,
                backgroundColor: '#fff5f5',
                boxShadow: '0 2px 8px rgba(183, 110, 121, 0.06)',
                transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`,
              }}
            >
              {/* Decorative quote */}
              <span
                className="text-3xl leading-none block -mb-2"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: 'rgba(183, 110, 121, 0.3)',
                }}
              >
                &ldquo;
              </span>

              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: '#2d2020' }}
              >
                {wish.message}
              </p>

              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium"
                  style={{ color: '#b76e79' }}
                >
                  {wish.guestName}
                </p>
                <p className="text-xs" style={{ color: '#9e8e8e' }}>
                  {moment(wish.createdAt).format('ddd, DD MMM HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
