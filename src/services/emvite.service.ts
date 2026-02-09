import type {
  RsvpDataType,
  WeddingInvitationDetailDataType,
  WishDataType,
} from "../types/emvite.type";
import { api, type ApiResponse } from "./common";

export async function getInvitationDetailByGuest(
  guestId: string,
  signal?: AbortSignal,
) {
  const result = (await api.get(`/public/wedding/guest/${guestId}`, {
    signal,
  })) as ApiResponse<WeddingInvitationDetailDataType>;

  return {
    data: result.data,
    status: result.status,
    message: result.message,
  };
}
export async function getInvitationDetail(
  invitationId: string,
  signal?: AbortSignal,
) {
  const result = (await api.get(`/public/wedding/invitation/${invitationId}`, {
    signal,
  })) as ApiResponse<WeddingInvitationDetailDataType>;

  return {
    data: result.data,
    status: result.status,
    message: result.message,
  };
}

export async function createRsvp(
  data: {
    guestId: string;
    status: "attending" | "not_attending" | "maybe" | null;
    message: string | null;
  },
  signal?: AbortSignal,
) {
  const result = (await api.post("/rsvp", data, {
    signal,
  })) as ApiResponse<RsvpDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}

export async function createWish(
  data: {
    invitationId: string;
    guestName: string;
    message: string;
  },
  signal?: AbortSignal,
) {
  const result = (await api.post("/wish", data, {
    signal,
  })) as ApiResponse<WishDataType>;

  return {
    status: result.status,
    data: result.data,
    message: result.message,
  };
}
