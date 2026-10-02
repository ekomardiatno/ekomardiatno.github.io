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
    <section
      id="guestbook"
      className="px-6 py-24"
      style={{ backgroundColor: '#16213e' }}
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
          Ucapan & Doa
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
          Kirimkan ucapan dan doa terbaik Anda
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-10">
        {/* Chat-style wishes */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto velvet-scrollbar pr-2">
          {data.wishes.length === 0 && (
            <div className="flex h-40 items-center justify-center text-center">
              <p
                className="text-sm"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#6b7a99',
                }}
              >
                Belum ada ucapan.
                <br />
                Jadilah yang pertama
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`chat-bubble ${index % 2 === 0 ? 'chat-bubble-left' : 'chat-bubble-right'} v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  backgroundColor: index % 2 === 0 ? '#1a1a2e' : '#0f3460',
                  padding: '12px 16px',
                }}
              >
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#e94560',
                  }}
                >
                  {wish.guestName}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#b8c0d0',
                  }}
                >
                  {wish.message}
                </p>
                <p
                  className="text-[10px] mt-1.5 text-right"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#6b7a99',
                  }}
                >
                  {moment(wish.createdAt).format('DD MMM, HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat-style input form */}
        <div
          className={`v-reveal v-reveal-up ${isVisible ? 'v-visible' : ''}`}
          style={{
            transitionDelay: '0.3s',
            backgroundColor: '#1a1a2e',
            border: '1px solid rgba(233, 69, 96, 0.15)',
          }}
        >
          <form onSubmit={submitWish} className="p-5 space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Nama Anda"
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none transition"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 items-end">
              <textarea
                placeholder="Tulis ucapan..."
                rows={2}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none transition resize-none"
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-5 py-2.5 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 self-end"
                style={{
                  backgroundColor: '#e94560',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c23152';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e94560';
                }}
                disabled={isSubmitting || mode === 'preview'}
              >
                {isSubmitting ? (
                  <Spinner className="size-[15.5px]" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
