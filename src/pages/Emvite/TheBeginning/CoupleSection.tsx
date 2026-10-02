import { EMVITE_API_URL } from "../../../config";
import useEmvite from "../../../hooks/useEmvite";
import PersonCard from "./PersonCard";

export default function CoupleSection() {
  const { data } = useEmvite();

  if (!data) return null;

  return (
    <section id="couple" className="px-6 py-20 text-slate-900">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-3xl">Mempelai</h2>
        <p className="text-sm text-slate-500">Dengan penuh rasa syukur</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-16 md:grid-cols-2">
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
        />
      </div>
    </section>
  );
}
