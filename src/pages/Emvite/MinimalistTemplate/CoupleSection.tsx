import PersonCard from "./PersonCard";

export default function CoupleSection() {
  return (
    <section id="couple" className="px-6 py-20 text-slate-900">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-3xl">Mempelai</h2>
        <p className="text-sm text-slate-500">Dengan penuh rasa syukur</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-16 md:grid-cols-2">
        <PersonCard
          name="John Doe"
          photo="male-1.webp"
          fatherName="Father Name"
          motherName="Mother Name"
          hometown="Jakarta"
          personType='groom'
          />
        <PersonCard
          name="Jane Doe"
          photo="female-1.webp"
          fatherName="Father Name"
          motherName="Mother Name"
          hometown="Jakarta"
          personType='bride'
        />
      </div>
    </section>
  );
}
