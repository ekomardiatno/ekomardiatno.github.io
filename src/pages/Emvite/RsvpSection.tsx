import classNames from "classnames";
import { useState } from "react";

export default function RsvpSection() {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);

  return (
    <section id="rsvp" className="bg-neutral-50 px-6 py-20 text-neutral-900">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">RSVP</h2>
        <p className="text-sm text-neutral-500">
          Kindly confirm your attendance
        </p>
      </div>

      <form className="mx-auto max-w-xl space-y-6">
        <div>
          <label className="mb-2 block text-sm">Full Name</label>
          <input
            type="text"
            name="attendanceName"
            placeholder="Your name"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm">Will you attend?</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setAttendance("yes")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-neutral-900 text-white": attendance === "yes",
                  "border-neutral-300": attendance !== "yes",
                }
              )}
            >
              Yes, I will attend
            </button>
            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={classNames(
                "flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer",
                {
                  "bg-neutral-900 text-white": attendance === "no",
                  "border-neutral-300": attendance !== "no",
                }
              )}
            >
              Sorry, I can't attend
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm">Message (optional)</label>
          <textarea
            name="rsvpMessage"
            rows={4}
            placeholder="Write your wishes here..."
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-neutral-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-neutral-800 cursor-pointer"
        >
          Send RSVP
        </button>
      </form>
    </section>
  );
}
