import { EMVITE_API_URL } from "../../../config";
import useEmvite from "../../../hooks/useEmvite";
import PersonCard from "./PersonCard";

export default function CoupleSection() {
  const { data } = useEmvite();

  if (!data) return null;

  return (
    <section
      id="couple"
      className="px-6 py-20"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="mb-16 text-center">
        <h2
          className="mb-4 text-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          Mempelai
        </h2>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Dengan penuh rasa syukur
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-8">
        <PersonCard
          name={data.wedding.groomName}
          photo={
            data.wedding.groomPhotoPath
              ? `${EMVITE_API_URL}/file?filePath=${data.wedding.groomPhotoPath}`
              : undefined
          }
          fatherName={data.wedding.groomFatherName}
          motherName={data.wedding.groomMotherName}
          hometown={data.wedding.groomHometown}
          personType="groom"
          direction="left"
        />
        <PersonCard
          name={data.wedding.brideName}
          photo={
            data.wedding.bridePhotoPath
              ? `${EMVITE_API_URL}/file?filePath=${data.wedding.bridePhotoPath}`
              : undefined
          }
          fatherName={data.wedding.brideFatherName}
          motherName={data.wedding.brideMotherName}
          hometown={data.wedding.brideHometown}
          personType="bride"
          direction="right"
        />
      </div>
    </section>
  );
}
