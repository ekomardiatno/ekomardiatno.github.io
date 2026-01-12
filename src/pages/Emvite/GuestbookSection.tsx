import { useState, type FormEvent } from "react";

type Wish = {
  name: string;
  message: string;
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
      },
      ...wishes,
    ]);
    setName("");
    setMessage("");
  };

  return (
    <section id="guestbook" className="bg-white px-6 py-20 text-neutral-900">

      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl">Wishes</h2>
        <p className="text-sm text-neutral-500">Send your love and prayers</p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <form onSubmit={submitWish} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm">Name</label>
            <input type="text" className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm">Message</label>
            <textarea className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none" value={message} onChange={(e) => setMessage(e.target.value)}  />
          </div>

          <button type="submit" className="w-full rounded-full bg-neutral-900 px-6 py-4 text-sm tracking-wide text-white transition hover:bg-neutral-800 cursor-pointer">Send Wish</button>
        </form>

        <div className="max-h-105 space-y-4 overflow-y-auto pr-2">
          {
            wishes.length === 0 && (
              <p className="text-sm text-neutral-500">No wishes yet. Be the first.</p>
            )
          }
          {
            wishes.map((wish, index) => (
              <div key={index} className="rounded-xl border border-neutral-200 p-4">
                <p className="mb-1 text-sm font-medium">{wish.name}</p>
                <p className="text-sm text-neutral-600">{wish.message}</p>
              </div>
            ))
          }
        </div>

      </div>

    </section>
  )

}
