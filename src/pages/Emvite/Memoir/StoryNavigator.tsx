import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type PageConfig = {
  key: string;
  content: ReactNode;
  scrollable?: boolean;
};

type StoryNavigatorProps = {
  pages: PageConfig[];
};

export default function StoryNavigator({ pages }: StoryNavigatorProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [flashSide, setFlashSide] = useState<'left' | 'right' | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const directionLockedRef = useRef<'horizontal' | 'vertical' | null>(null);
  const pageWidth = useRef(window.innerWidth);

  const totalPages = pages.length;

  // Update pageWidth on resize
  useEffect(() => {
    const onResize = () => {
      pageWidth.current = window.innerWidth;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, []);

  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, totalPages - 1));
      setCurrentPage(clamped);
      setDragOffset(0);
      setIsDragging(false);
      directionLockedRef.current = null;
    },
    [totalPages],
  );

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);
  const goPrev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Touch handling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      directionLockedRef.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Direction detection
      if (!directionLockedRef.current) {
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
          directionLockedRef.current =
            Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
        } else {
          return;
        }
      }

      if (directionLockedRef.current === 'vertical') return;

      // Horizontal swipe
      e.preventDefault();
      setIsDragging(true);

      // Edge damping
      const atStart = currentPage === 0 && deltaX > 0;
      const atEnd = currentPage === totalPages - 1 && deltaX < 0;
      const offset = atStart || atEnd ? deltaX * 0.3 : deltaX;

      setDragOffset(offset);
    };

    const onTouchEnd = () => {
      if (!touchStartRef.current || directionLockedRef.current !== 'horizontal') {
        touchStartRef.current = null;
        directionLockedRef.current = null;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }

      const elapsed = Date.now() - touchStartRef.current.time;
      const velocity = Math.abs(dragOffset) / elapsed;
      const threshold = pageWidth.current * 0.2;

      if (velocity > 0.5 || Math.abs(dragOffset) > threshold) {
        if (dragOffset < 0) goNext();
        else goPrev();
      } else {
        // Snap back
        setDragOffset(0);
        setIsDragging(false);
      }

      touchStartRef.current = null;
      directionLockedRef.current = null;
    };

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentPage, totalPages, dragOffset, goNext, goPrev]);

  // Tap navigation
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Skip if target is interactive
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'A' ||
        target.closest('[data-memoir-interactive]') ||
        target.closest('a') ||
        target.closest('button')
      )
        return;

      const x = e.clientX;
      const w = window.innerWidth;
      const leftZone = w * 0.35;

      if (x < leftZone) {
        setFlashSide('left');
        goPrev();
      } else {
        setFlashSide('right');
        goNext();
      }
    },
    [goNext, goPrev],
  );

  // Clear flash
  useEffect(() => {
    if (flashSide) {
      const id = setTimeout(() => setFlashSide(null), 300);
      return () => clearTimeout(id);
    }
  }, [flashSide]);

  const translateX = -(currentPage * pageWidth.current) + dragOffset;
  const transitionStyle = isDragging
    ? 'none'
    : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div className="memoir-bg" style={{ width: '100vw', height: '100dvh' }}>
      {/* Progress bars */}
      <div className="memoir-progress">
        {pages.map((_, i) => (
          <div key={i} className="memoir-progress-segment">
            <div
              className="memoir-progress-fill"
              style={{
                width: i < currentPage ? '100%' : i === currentPage ? '100%' : '0%',
                opacity: i <= currentPage ? 1 : 0.3,
              }}
            />
          </div>
        ))}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="memoir-track"
        onClick={handleClick}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: transitionStyle,
          willChange: isDragging ? 'transform' : 'auto',
        }}
      >
        {pages.map((page, i) => {
          const isActive = i === currentPage;
          return (
            <div
              key={page.key}
              className={`memoir-page ${page.scrollable ? 'memoir-page-scrollable' : ''} ${isActive ? 'memoir-page-active' : ''}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              {page.content}
            </div>
          );
        })}
      </div>

      {/* Tap flash overlays */}
      <div
        className={`memoir-tap-flash memoir-tap-flash-left ${flashSide === 'left' ? 'memoir-flash-active' : ''}`}
      />
      <div
        className={`memoir-tap-flash memoir-tap-flash-right ${flashSide === 'right' ? 'memoir-flash-active' : ''}`}
      />

      {/* Page counter */}
      <div className="memoir-counter">
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
}
