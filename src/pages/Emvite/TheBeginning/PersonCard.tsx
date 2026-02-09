type PersonProps = {
  name: string;
  photo?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  personType: "bride" | "groom";
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
  personType,
}: PersonProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 size-40 overflow-hidden rounded-full border border-slate-200 flex items-center justify-center">
        {photo ? (
          <img
            src={photo}
            alt="name"
            className="size-full w-full object-cover"
          />
        ) : (
          <p className="text-lg font-bold">
            {name
              .split(" ")
              .slice(0, 2)
              .map((v) => v.at(0)?.toUpperCase())
              .join("")}
          </p>
        )}
      </div>

      <h3 className="font-serif text-xl text-slate-800">{name}</h3>

      {(fatherName || motherName) && (
        <div className="mt-2">
          <p className="text-sm text-slate-600">
            {personType === "bride" ? "Putri dari" : "Putra dari"}
          </p>
          <p className="text-sm text-slate-700">
            {[fatherName, motherName].filter((v) => !!v).join(" & ")}
          </p>
        </div>
      )}

      {hometown && (
        <p className="mt-2 text-sm italic text-slate-500">{hometown}</p>
      )}
    </div>
  );
}
