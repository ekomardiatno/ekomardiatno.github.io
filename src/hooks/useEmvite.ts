import { createContext, useContext } from "react";
import type {
  RsvpDataType,
  WeddingInvitationDetailDataType,
  WishDataType,
} from "../types/emvite.type";

export const EmviteContext = createContext<{
  toast: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  data: WeddingInvitationDetailDataType | null;
  pushWish: (data: WishDataType) => void;
  patchRsvp: (data: RsvpDataType) => void;
  mode: "preview" | "guest";
}>({
  toast: () => {},
  data: null,
  isLoading: true,
  error: null,
  pushWish: () => {},
  patchRsvp: () => {},
  mode: "preview",
});

export default function useEmvite() {
  return useContext(EmviteContext);
}
