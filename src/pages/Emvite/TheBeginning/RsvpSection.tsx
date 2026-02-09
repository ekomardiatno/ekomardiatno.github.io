import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import useEmvite from "../../../hooks/useEmvite";
import { createRsvp } from "../../../services/emvite.service";
import type { ApiError } from "../../../services/common";
import Spinner from "../../../components/Spinner";

export default function RsvpSection() {
  const [attendance, setAttendance] = useState<
    "attending" | "not_attending" | null
  >(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, patchRsvp, toast, mode } = useEmvite();

  const statusAttandance =
    data?.rsvp?.status === "maybe" ? null : data?.rsvp?.status || null;

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
          setMessage("");
          setIsSubmitting(false);
        } else {
          throw new Error(res.message || "Failed to create/update RSVP");
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
    <section id="rsvp" className="bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Konfirmasi Kehadiran</h2>
        <p className="text-sm text-slate-500">
          Mohon konfirmasi kehadiran Anda
        </p>
      </div>

      <form className="mx-auto max-w-xl space-y-6">
        {/* <div>
          <label className="mb-2 block text-sm">Nama Lengkap</label>
          <input
            type="text"
            name="attendanceName"
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div> */}
        <div>
          <label className="mb-3 block text-sm">Apakah Anda akan hadir?</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setAttendance("attending")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-slate-900 text-white":
                    (attendance ?? statusAttandance) === "attending",
                  "border-slate-300":
                    (attendance ?? statusAttandance) !== "attending",
                },
              )}
            >
              Ya, saya akan hadir
            </button>
            <button
              type="button"
              onClick={() => setAttendance("not_attending")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-slate-900 text-white":
                    (attendance ?? statusAttandance) === "not_attending",
                  "border-slate-300":
                    (attendance ?? statusAttandance) !== "not_attending",
                },
              )}
            >
              Maaf, saya tidak bisa hadir
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm">Ucapan (opsional)</label>
          <textarea
            name="rsvpMessage"
            rows={4}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Tuliskan ucapan dan doa..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
            value={message || data.rsvp?.message || ""}
          />
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={isSubmitting || mode === "preview"}
        >
          {isSubmitting ? (
            <Spinner className="size-[15.5px] inline-block" />
          ) : (
            "Kirim Konfirmasi"
          )}
        </button>
      </form>
    </section>
  );
}
