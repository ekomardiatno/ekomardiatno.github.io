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
    <section
      id="rsvp"
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
          Konfirmasi Kehadiran
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Mohon konfirmasi kehadiran Anda
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        {/* Double-frame card */}
        <div
          className="rounded-xl p-8"
          style={{
            backgroundColor: "#1e293b",
            border: "2px solid #d4a853",
            outline: "1px solid rgba(212, 168, 83, 0.3)",
            outlineOffset: "4px",
          }}
        >
          <form className="space-y-6">
            <div>
              <label
                className="mb-3 block text-sm"
                style={{ color: "#fef3c7" }}
              >
                Apakah Anda akan hadir?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance("attending")}
                  className={classNames(
                    "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                    {
                      "border-[#d4a853] text-[#0a0e1a]":
                        (attendance ?? statusAttandance) === "attending",
                      "border-[rgba(212,168,83,0.3)] text-[#94a3b8]":
                        (attendance ?? statusAttandance) !== "attending",
                    },
                  )}
                  style={
                    (attendance ?? statusAttandance) === "attending"
                      ? { backgroundColor: "#d4a853" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Ya, saya akan hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("not_attending")}
                  className={classNames(
                    "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                    {
                      "border-[#d4a853] text-[#0a0e1a]":
                        (attendance ?? statusAttandance) === "not_attending",
                      "border-[rgba(212,168,83,0.3)] text-[#94a3b8]":
                        (attendance ?? statusAttandance) !== "not_attending",
                    },
                  )}
                  style={
                    (attendance ?? statusAttandance) === "not_attending"
                      ? { backgroundColor: "#d4a853" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Maaf, saya tidak bisa hadir
                </button>
              </div>
            </div>
            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: "#fef3c7" }}
              >
                Ucapan (opsional)
              </label>
              <textarea
                name="rsvpMessage"
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa..."
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
                value={message || data.rsvp?.message || ""}
              />
            </div>

            <button
              type="button"
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
        </div>
      </div>
    </section>
  );
}
