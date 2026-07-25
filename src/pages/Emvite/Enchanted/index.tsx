import CountdownSection from './CountdownSection';
import CoupleSection from './CoupleSection';
import EventDetailsSection from './EventDetailsSection';
import FooterSection from './FooterSection';
import GuestbookSection from './GuestbookSection';
import HeroSection from './HeroSection';
import LocationSection from './LocationSection';
import RsvpSection from './RsvpSection';
import WeddingGiftSection from './WeddingGiftSection';

export default function Enchanted() {
  return (
    <div className="h-dvh overflow-y-auto snap-y snap-mandatory enchanted-bg">
      <section className="min-h-dvh snap-start flex flex-col">
        <HeroSection />
      </section>
      <section className="min-h-dvh snap-start flex flex-col justify-center">
        <CountdownSection />
      </section>
      <section className="min-h-dvh snap-start flex flex-col justify-center">
        <CoupleSection />
      </section>
      <section className="min-h-dvh snap-start flex flex-col justify-center">
        <EventDetailsSection />
      </section>
      <section className="snap-start">
        <LocationSection />
        <RsvpSection />
        <WeddingGiftSection />
        <GuestbookSection />
        <FooterSection />
      </section>
    </div>
  );
}
