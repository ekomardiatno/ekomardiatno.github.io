export type WishDataType = {
  guestName: string;
  message: string;
  createdAt: Date;
};

export type TemplateDataType = {
  name: string;
  description: null;
  previewImagePath: string | null;
  previewImageMime: string | null;
  templateCode: string;
  createdAt: Date;
};

export type GiftInfoDataType = {
  type: "bank" | "e-wallet";
  provider:
    | "BCA"
    | "BRI"
    | "BNI"
    | "Mandiri"
    | "BSI"
    | "BRK Syariah"
    | "BTN"
    | "GoPay"
    | "ShopeePay"
    | "Dana";
  accountName: string;
  accountNumber: string;
  createdAt: Date;
};

export type EventDataType = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string | null;
  venue: string | null;
  location: string | null;
  isMainEvent: boolean;
  createdAt: Date;
};

export type RsvpDataType = {
  guestId: string;
  status: "attending" | "not_attending" | "maybe" | null;
  message: string | null;
  createdAt: Date;
};

export type WeddingDataType = {
  groomName: string;
  brideName: string;
  groomNickname: string | null;
  brideNickname: string | null;
  groomHometown: string | null;
  brideHometown: string | null;
  groomFatherName: string | null;
  groomMotherName: string | null;
  brideFatherName: string | null;
  brideMotherName: string | null;
  bridePhotoPath: string | null;
  bridePhotoMime: string | null;
  groomPhotoPath: string | null;
  groomPhotoMime: string | null;
  createdAt: Date;
};

export type WeddingInvitationDetailDataType = {
  invitationId: string;
  guest?: {
    id: string;
    name: string;
  };
  rsvp?: RsvpDataType | null;
  wedding: WeddingDataType;
  events: EventDataType[];
  giftInfos: GiftInfoDataType[];
  template: TemplateDataType;
  wishes: WishDataType[];
};
