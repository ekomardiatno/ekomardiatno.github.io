import CountdownSection from "./CountdownSection";
import CoupleSection from "./CoupleSection";
import EventDetailsSection from "./EventDetailsSection";
import FooterSection from "./FooterSection";
import GuestbookSection from "./GuestbookSection";
import HeroSection from "./HeroSection";
import LocationSection from "./LocationSection";
import RsvpSection from "./RsvpSection";
import WeddingGiftSection from "./WeddingGiftSection";

export default function Celestial() {
  return (
    <div className="min-h-screen celestial-bg">
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
