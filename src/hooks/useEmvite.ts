import { createContext, useContext } from "react";

export const EmviteContext = createContext<{
  toast: (text: string) => void;
}>({
  toast: () => {},
});

export default function useEmvite() {
  return useContext(EmviteContext);
}
