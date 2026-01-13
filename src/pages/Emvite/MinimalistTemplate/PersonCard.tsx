type PersonProps = {
  name: string;
  photo: string;
  fatherName: string;
  motherName: string;
  hometown: string;
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
      <div className="mb-4 size-40 overflow-hidden rounded-full border border-slate-200">
        <img src={photo} alt="name" className="size-full w-full object-cover" />
      </div>

      <h3 className="mb-2 font-serif text-xl text-slate-800">{name}</h3>

      <p className="text-sm text-slate-600">
        {personType === "bride" ? "Putri dari" : "Putra dari"}
      </p>
      <p className="text-sm text-slate-700">
        {fatherName} & {motherName}
      </p>

      <p className="mt-2 text-sm italic text-slate-500">{hometown}</p>
    </div>
  );
}
