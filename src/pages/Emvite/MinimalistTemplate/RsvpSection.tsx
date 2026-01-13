import classNames from "classnames";
import { useState } from "react";

export default function RsvpSection() {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);

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
              onClick={() => setAttendance("yes")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-slate-900 text-white": attendance === "yes",
                  "border-slate-300": attendance !== "yes",
                }
              )}
            >
              Ya, saya akan hadir
            </button>
            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-slate-900 text-white": attendance === "no",
                  "border-slate-300": attendance !== "no",
                }
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
            placeholder="Tuliskan ucapan dan doa..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-slate-800 cursor-pointer"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </section>
  );
}
