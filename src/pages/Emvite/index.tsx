import MinimalistTemplate from "./MinimalistTemplate";
import { EmviteContext } from "../../hooks/useEmvite";
import Toast from "./Toast";
import { useState } from "react";

export default function Emvite() {
  // const params = useParams() as {
  //   weddingId: string;
  // };
  const [toastDetails, setToastDetails] = useState<{
    text: string;
    duration?: number;
  } | null>(null);

  const toast = (text: string, duration?: number) => {
    setToastDetails({
      text,
      duration: duration,
    });
  };

  const onHidden = () => {
    console.log('first')
    setToastDetails(null);
  };

  return (
    <EmviteContext.Provider value={{ toast }}>
      <MinimalistTemplate />
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
