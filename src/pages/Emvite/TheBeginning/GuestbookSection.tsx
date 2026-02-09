import moment from "moment";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import useEmvite from "../../../hooks/useEmvite";
import { createWish } from "../../../services/emvite.service";
import type { ApiError } from "../../../services/common";
import Spinner from "../../../components/Spinner";

export default function GuestbookSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { data, pushWish, toast, mode } = useEmvite();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitWish = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "preview") {
      toast("Tidak bisa mengirim ucapan di mode ini");
      return;
    }
    if (!name || !message) {
      toast("Wajib memasukkan nama dan ucapan");
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
          setName("");
          setMessage("");
        } else {
          throw new Error(res.message || "Failed to send wish");
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== "canceled") ||
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
    <section id="guestbook" className="bg-white px-6 py-20 text-slate-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Ucapan & Doa</h2>
        <p className="text-sm text-slate-500">
          Kirimkan ucapan dan doa terbaik Anda
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <form onSubmit={submitWish} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm">Nama</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Ucapan</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
            disabled={isSubmitting || mode === "preview"}
          >
            {isSubmitting ? (
              <Spinner className="size-[15.5px] inline-block" />
            ) : (
              "Kirim Ucapan"
            )}
          </button>
        </form>

        <div className="max-h-105 space-y-4 overflow-y-auto pr-2">
          {data.wishes.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-slate-400">
                Belum ada ucapan.
                <br />
                Jadilah yang pertama
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800">
                  {wish.guestName}
                </p>
                <p className="text-xs text-slate-400">
                  {moment(wish.createdAt).format("ddd, DD MMM HH:mm")}
                </p>
              </div>

              {/* Message */}
              <p className="text-sm leading-relaxed text-slate-600">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
