type PersonProps = {
  name: string;
  photo: string;
  fatherName: string;
  motherName: string;
  hometown: string;
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
}: PersonProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 size-40 overflow-hidden rounded-full border border-neutral-200">
        <img src={photo} alt="name" className="size-full w-full object-cover" />
      </div>

      <h3 className="mb-2 font-serif text-xl text-neutral-800">{name}</h3>

      <p className="text-sm text-neutral-600">Child of</p>
      <p className="text-sm text-neutral-700">
        {fatherName} & {motherName}
      </p>

      <p className="mt-2 text-sm italic text-neutral-500">{hometown}</p>
    </div>
  );
}
