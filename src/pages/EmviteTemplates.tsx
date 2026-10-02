import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTemplates } from '../services/emvite.service';
import { EMVITE_API_URL } from '../config';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import type { TemplateListItemType } from '../types/emvite.type';

export default function EmviteTemplates() {
  const [templates, setTemplates] = useState<TemplateListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function fetchTemplates(signal?: AbortSignal) {
    setIsLoading(true);
    setError(null);
    getTemplates(signal)
      .then((result) => {
        setTemplates(result.data);
      })
      .catch((err) => {
        if (err?.name === 'CanceledError' || signal?.aborted) return;
        setError(err?.message || 'Failed to load templates');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchTemplates(controller.signal);
    return () => controller.abort();
  }, []);

  function getSlug(templateCode: string) {
    return templateCode.toLowerCase().replace(/_/g, '-');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <ErrorState
          title="Gagal memuat template"
          message={error}
          retryLabel="Coba Lagi"
          onRetry={() => fetchTemplates()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1
            className="mb-4 text-4xl font-bold tracking-wide text-white sm:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Template Undangan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Pilih template undangan pernikahan yang sesuai dengan gaya dan tema pernikahan Anda.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-800">
                {template.previewImagePath ? (
                  <img
                    src={`${EMVITE_API_URL}/file?filePath=${template.previewImagePath}`}
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className="text-2xl text-gray-500"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {template.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2
                  className="mb-2 text-xl font-semibold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {template.name}
                </h2>
                {template.description && (
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    {template.description}
                  </p>
                )}
                <Link
                  to={`/emvite/demo/${getSlug(template.templateCode)}`}
                  className="inline-block rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  Lihat Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
