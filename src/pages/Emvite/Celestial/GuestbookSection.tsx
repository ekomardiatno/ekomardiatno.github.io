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
    <section
      id="guestbook"
      className="px-6 py-20"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <div className="mb-12 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          Ucapan & Doa
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Kirimkan ucapan dan doa terbaik Anda
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-12">
        {/* Form - full width framed card */}
        <div
          className="rounded-xl p-8"
          style={{
            backgroundColor: "#1e293b",
            border: "2px solid #d4a853",
            outline: "1px solid rgba(212, 168, 83, 0.3)",
            outlineOffset: "4px",
          }}
        >
          <form onSubmit={submitWish} className="space-y-6">
            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: "#fef3c7" }}
              >
                Nama
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.5)",
                  borderColor: "rgba(212, 168, 83, 0.3)",
                  color: "#fef3c7",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a853";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: "#fef3c7" }}
              >
                Ucapan
              </label>
              <textarea
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.5)",
                  borderColor: "rgba(212, 168, 83, 0.3)",
                  color: "#fef3c7",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a853";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full px-6 py-4 text-sm tracking-wide transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: "#d4a853",
                color: "#0a0e1a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e2bd6e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#d4a853";
              }}
              disabled={isSubmitting || mode === "preview"}
            >
              {isSubmitting ? (
                <Spinner className="size-[15.5px] inline-block" />
              ) : (
                "Kirim Ucapan"
              )}
            </button>
          </form>
        </div>

        {/* Wishes - offset bubble cards */}
        <div className="space-y-4">
          {data.wishes.length === 0 && (
            <div className="flex h-40 items-center justify-center text-center">
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Belum ada ucapan.
                <br />
                Jadilah yang pertama
              </p>
            </div>
          )}
          {data.wishes.map((wish, index) => (
            <div
              key={index}
              className={`glass-card rounded-xl p-5 ${
                index % 3 === 0
                  ? "ml-0 mr-8"
                  : index % 3 === 1
                    ? "ml-8 mr-0"
                    : "ml-4 mr-4"
              }`}
            >
              {/* Decorative quote */}
              <span
                className="text-3xl leading-none block -mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(212, 168, 83, 0.4)",
                }}
              >
                &ldquo;
              </span>

              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#fef3c7" }}
              >
                {wish.message}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium" style={{ color: "#d4a853" }}>
                  {wish.guestName}
                </p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>
                  {moment(wish.createdAt).format("ddd, DD MMM HH:mm")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
