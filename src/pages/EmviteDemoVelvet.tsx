import { useState } from 'react';
import { EmviteContext } from '../hooks/useEmvite';
import type {
  RsvpDataType,
  WeddingInvitationDetailDataType,
  WishDataType,
} from '../types/emvite.type';
import Velvet from './Emvite/Velvet';
import Toast from './Emvite/Toast';

const demoData: WeddingInvitationDetailDataType = {
  invitationId: 'demo-velvet-001',
  guest: {
    id: 'guest-001',
    name: 'Budi Santoso',
  },
  rsvp: null,
  wedding: {
    groomName: 'Ahmad Rizky Pratama',
    brideName: 'Siti Nurhaliza Putri',
    groomNickname: 'Rizky',
    brideNickname: 'Haliza',
    groomHometown: 'Bandung',
    brideHometown: 'Yogyakarta',
    groomFatherName: 'H. Suherman Pratama',
    groomMotherName: 'Hj. Ratna Dewi',
    brideFatherName: 'H. Muhammad Yusuf',
    brideMotherName: 'Hj. Aminah Sari',
    groomPhotoPath: null,
    groomPhotoMime: null,
    bridePhotoPath: null,
    bridePhotoMime: null,
    createdAt: new Date('2026-01-15'),
  },
  events: [
    {
      title: 'Akad Nikah',
      date: '2026-09-12',
      startTime: '08:00:00',
      endTime: '10:00:00',
      venue: 'Masjid Agung Al-Falah',
      address: 'Jl. Merdeka No. 1, Bandung, Jawa Barat',
      location: '-6.9175, 107.6191',
      isMainEvent: true,
      createdAt: new Date('2026-01-15'),
    },
    {
      title: 'Resepsi',
      date: '2026-09-12',
      startTime: '11:00:00',
      endTime: '14:00:00',
      venue: 'Gedung Sate Ballroom',
      address: 'Jl. Diponegoro No. 22, Bandung, Jawa Barat',
      location: '-6.9025, 107.6186',
      isMainEvent: false,
      createdAt: new Date('2026-01-15'),
    },
  ],
  giftInfos: [
    {
      type: 'bank',
      provider: 'BCA',
      accountName: 'Ahmad Rizky Pratama',
      accountNumber: '1234567890',
      createdAt: new Date('2026-01-15'),
    },
    {
      type: 'e-wallet',
      provider: 'GoPay',
      accountName: 'Siti Nurhaliza Putri',
      accountNumber: '081234567890',
      createdAt: new Date('2026-01-15'),
    },
  ],
  template: {
    name: 'Velvet',
    description: null,
    previewImagePath: null,
    previewImageMime: null,
    templateCode: 'VELVET',
    createdAt: new Date('2026-01-01'),
  },
  wishes: [
    {
      guestName: 'Rina Wulandari',
      message:
        'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.',
      createdAt: new Date('2026-07-20T10:30:00'),
    },
    {
      guestName: 'Deni Kurniawan',
      message:
        "Barakallahu lakuma wa baraka 'alaikuma. Semoga selalu dilimpahkan kebahagiaan!",
      createdAt: new Date('2026-07-19T14:15:00'),
    },
    {
      guestName: 'Fitri Handayani',
      message: 'Happy wedding! Semoga langgeng sampai Jannah. Aamiin.',
      createdAt: new Date('2026-07-18T09:00:00'),
    },
  ],
};

export default function EmviteDemoVelvet() {
  const [data, setData] = useState<WeddingInvitationDetailDataType>(demoData);
  const [toastDetails, setToastDetails] = useState<{
    text: string;
    duration?: number;
  } | null>(null);

  const toast = (text: string, duration?: number) => {
    setToastDetails({ text, duration });
  };

  const pushWish = (wish: WishDataType) => {
    setData((state) => ({
      ...state,
      wishes: [
        {
          createdAt: wish.createdAt,
          guestName: wish.guestName,
          message: wish.message,
        },
        ...state.wishes,
      ],
    }));
  };

  const patchRsvp = (rsvp: RsvpDataType) => {
    setData((state) => ({
      ...state,
      rsvp: {
        createdAt: rsvp.createdAt,
        guestId: rsvp.guestId,
        message: rsvp.message,
        status: rsvp.status,
      },
    }));
  };

  return (
    <EmviteContext.Provider
      value={{
        toast,
        data,
        isLoading: false,
        error: null,
        pushWish,
        patchRsvp,
        mode: 'preview',
      }}
    >
      <Velvet />
      {toastDetails && (
        <Toast
          text={toastDetails.text}
          duration={toastDetails.duration}
          onHidden={() => setToastDetails(null)}
        />
      )}
    </EmviteContext.Provider>
  );
}
