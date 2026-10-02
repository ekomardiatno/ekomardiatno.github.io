import { useEffect, useState } from 'react';
import CountdownSection from './CountdownSection';
import CoupleSection from './CoupleSection';
import EventDetailsSection from './EventDetailsSection';
import FooterSection from './FooterSection';
import GuestbookSection from './GuestbookSection';
import HeroSection from './HeroSection';
import LocationSection from './LocationSection';
import RsvpSection from './RsvpSection';
import SideNav from './SideNav';
import WeddingGiftSection from './WeddingGiftSection';

export default function Velvet() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="velvet-bg min-h-screen">
      {/* Progress bar */}
      <div className="velvet-progress" style={{ width: `${progress}%` }} />

      {/* Side dot navigation */}
      <SideNav />

      <HeroSection />
      <CountdownSection />
      <CoupleSection />
      <EventDetailsSection />
      <LocationSection />
      <RsvpSection />
      <WeddingGiftSection />
      <GuestbookSection />
      <FooterSection />
    </div>
  );
}
