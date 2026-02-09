import TheBeginning from "./TheBeginning";
import { EmviteContext } from "../../hooks/useEmvite";
import Toast from "./Toast";
import { useCallback, useEffect, useState } from "react";
import {
  getInvitationDetail,
  getInvitationDetailByGuest,
} from "../../services/emvite.service";
import { useParams } from "react-router";
import type {
  RsvpDataType,
  WeddingInvitationDetailDataType,
  WishDataType,
} from "../../types/emvite.type";
import type { ApiError } from "../../services/common";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

export default function Emvite({ mode }: { mode: "preview" | "guest" }) {
  const params = useParams() as {
    id: string;
  };
  const [toastDetails, setToastDetails] = useState<{
    text: string;
    duration?: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<WeddingInvitationDetailDataType | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const toast = (text: string, duration?: number) => {
    setToastDetails({
      text,
      duration: duration,
    });
  };

  const onHidden = () => {
    console.log("first", mode);
    setToastDetails(null);
  };

  const fetchInvitationDetails = useCallback(
    async (signal?: AbortSignal) => {
      setError(null);
      const request = () =>
        mode === "guest"
          ? getInvitationDetailByGuest(params.id, signal)
          : getInvitationDetail(params.id, signal);
      try {
        const res = await request();
        if ((res.status >= 200 && res.status < 300) || res.status === 304) {
          setData(res.data);
          setIsLoading(false);
        } else {
          throw new Error(res.message || "Failed to retrieve");
        }
      } catch (e) {
        if (
          (e instanceof Error && e.message !== "canceled") ||
          (e as ApiError).message
        ) {
          setError((e as Error | ApiError).message);
        }
        setIsLoading(false);
      }
    },
    [mode, params.id],
  );

  const pushWish = (data: WishDataType) => {
    setData((state) => {
      if (!state) return null;
      const wishes = state?.wishes;
      return {
        ...state,
        wishes: [
          {
            createdAt: data.createdAt,
            guestName: data.guestName,
            message: data.message,
          },
          ...wishes,
        ],
      };
    });
  };

  const patchRsvp = (data: RsvpDataType) => {
    setData((state) => {
      if (!state) return null;
      return {
        ...state,
        rsvp: {
          createdAt: data.createdAt,
          guestId: data.guestId,
          message: data.message,
          status: data.status,
        },
      };
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    if (isLoading) {
      fetchInvitationDetails(controller.signal);
    } else {
      controller.abort();
    }
  }, [isLoading, fetchInvitationDetails]);

  if (isLoading) return <LoadingState />;

  if (error)
    return (
      <ErrorState
        title="Oops!"
        message={error}
        retryLabel="Muat Ulang"
        onRetry={() => {
          setIsLoading(true);
        }}
      />
    );

  return (
    <EmviteContext.Provider
      value={{
        toast,
        data,
        isLoading,
        error,
        pushWish,
        patchRsvp,
        mode,
      }}
    >
      <TheBeginning />
      {toastDetails && (
        <Toast
          text={toastDetails.text}
          duration={toastDetails.duration}
          onHidden={onHidden}
        />
      )}
    </EmviteContext.Provider>
  );
}
