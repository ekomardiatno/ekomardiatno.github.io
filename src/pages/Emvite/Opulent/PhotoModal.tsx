import { useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function PhotoModal({ src, alt, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center op-modal-overlay"
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)' }} />

      <div className="relative z-10 p-4" onClick={(e) => e.stopPropagation()}>
        {/* Ornate frame around photo */}
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="max-w-[85vw] max-h-[70vh] object-contain"
            style={{ border: '3px solid #b8860b' }}
          />
        </div>

        <p
          className="text-center mt-4 text-sm"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#d4af37',
          }}
        >
          {alt}
        </p>
      </div>

      {/* Close button */}
      <button
        type="button"
        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center cursor-pointer transition"
        style={{ border: '1px solid rgba(212, 175, 55, 0.3)', color: '#d4af37' }}
        onClick={onClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
