import moment from "moment";
import { useState, type FormEvent } from "react";

type Wish = {
  name: string;
  message: string;
  createdAt: Date;
};

export default function GuestbookSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitWish = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setWishes([
      {
        name,
        message,
        createdAt: new Date(),
      },
      ...wishes,
    ]);
    setName("");
    setMessage("");
  };

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
            className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-slate-800 cursor-pointer"
          >
            Kirim Ucapan
          </button>
        </form>

        <div className="max-h-105 space-y-4 overflow-y-auto pr-2">
          {wishes.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-slate-400">
                Belum ada ucapan.
                <br />
                Jadilah yang pertama
              </p>
            </div>
          )}
          {wishes.map((wish, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800">
                  {wish.name}
                </p>
                <p className="text-xs text-slate-400">
                  {moment(wish.createdAt).format('ddd, DD MMM HH:mm')}
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
