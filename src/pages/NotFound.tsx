import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-slate-900 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium tracking-widest text-red-400 mb-3">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-slate-400 mb-10">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
