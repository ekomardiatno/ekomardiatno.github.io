import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'couple', label: 'Mempelai' },
  { id: 'details', label: 'Acara' },
  { id: 'location', label: 'Lokasi' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'gift', label: 'Hadiah' },
  { id: 'guestbook', label: 'Ucapan' },
];

export default function SideNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(index);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="velvet-side-nav hidden md:flex">
      {sections.map((section, i) => (
        <button
          key={section.id}
          type="button"
          className={`velvet-dot ${active === i ? 'active' : ''}`}
          title={section.label}
          onClick={() => {
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ))}
    </nav>
  );
}
