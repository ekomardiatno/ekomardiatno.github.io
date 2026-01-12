import { useParams } from "react-router";
import CoupleSection from "./CoupleSection";
import EventDetailsSection from "./EventDetailsSection";
import LocationSection from "./LocationSection";
import RsvpSection from "./RsvpSection";
import WeddingGiftSection from "./WeddingGiftSection";
import GuestbookSection from "./GuestbookSection";
import CountdownSection from "./CountdownSection";
import HeroSection from "./HeroSection";

export default function Emvite() {
  const params = useParams() as {
    weddingId: string;
  };

  console.log(params);

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection />
      <CountdownSection />
      <CoupleSection />
      <EventDetailsSection />
      <LocationSection />
      <RsvpSection />
      <WeddingGiftSection />
      <GuestbookSection />
    </div>
  );
}
