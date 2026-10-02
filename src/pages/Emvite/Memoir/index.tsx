import useEmvite from '../../../hooks/useEmvite';
import StoryNavigator from './StoryNavigator';
import CoverPage from './CoverPage';
import CountdownPage from './CountdownPage';
import PersonPage from './PersonPage';
import EventPage from './EventPage';
import RsvpPage from './RsvpPage';
import GiftPage from './GiftPage';
import GuestbookPage from './GuestbookPage';
import ClosingPage from './ClosingPage';

export default function Memoir() {
  const { data } = useEmvite();
  if (!data) return null;

  const { wedding, events, giftInfos } = data;

  const pages = [
    { key: 'cover', content: <CoverPage /> },
    { key: 'countdown', content: <CountdownPage /> },
    {
      key: 'groom',
      content: (
        <PersonPage
          name={wedding.groomName}
          nickname={wedding.groomNickname}
          fatherName={wedding.groomFatherName}
          motherName={wedding.groomMotherName}
          hometown={wedding.groomHometown}
          photoPath={wedding.groomPhotoPath}
          personType="groom"
        />
      ),
    },
    {
      key: 'bride',
      content: (
        <PersonPage
          name={wedding.brideName}
          nickname={wedding.brideNickname}
          fatherName={wedding.brideFatherName}
          motherName={wedding.brideMotherName}
          hometown={wedding.brideHometown}
          photoPath={wedding.bridePhotoPath}
          personType="bride"
        />
      ),
    },
    ...events.map((event, i) => ({
      key: `event-${i}`,
      content: <EventPage event={event} />,
    })),
    { key: 'rsvp', content: <RsvpPage />, scrollable: true },
    ...(giftInfos.length > 0
      ? [{ key: 'gift', content: <GiftPage />, scrollable: true }]
      : []),
    { key: 'guestbook', content: <GuestbookPage />, scrollable: true },
    { key: 'closing', content: <ClosingPage /> },
  ];

  return <StoryNavigator pages={pages} />;
}
