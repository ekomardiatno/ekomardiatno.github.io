type PersonProps = {
  name: string;
  photo?: string | null;
  fatherName: string | null;
  motherName: string | null;
  hometown: string | null;
  personType: "bride" | "groom";
  direction: "left" | "right";
};

export default function PersonCard({
  name,
  photo,
  fatherName,
  motherName,
  hometown,
  personType,
  direction,
}: PersonProps) {
  return (
    <div
      className={`flex items-center gap-6 glass-card rounded-xl p-5 ${
        direction === "left" ? "flex-row" : "flex-row-reverse"
      }`}
      style={{ borderTop: "2px solid #d4a853" }}
    >
      <div className="w-32 h-44 md:w-40 md:h-56 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-[#111827]">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p
            className="text-2xl font-bold"
            style={{ color: "#d4a853" }}
          >
            {name
              .split(" ")
              .slice(0, 2)
              .map((v) => v.at(0)?.toUpperCase())
              .join("")}
          </p>
        )}
      </div>

      <div className={direction === "left" ? "text-left" : "text-right"}>
        <h3
          className="text-xl md:text-2xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fef3c7",
          }}
        >
          {name}
        </h3>

        {(fatherName || motherName) && (
          <div className="mt-3">
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              {personType === "bride" ? "Putri dari" : "Putra dari"}
            </p>
            <p className="text-sm mt-1" style={{ color: "#a1947b" }}>
              {[fatherName, motherName].filter((v) => !!v).join(" & ")}
            </p>
          </div>
        )}

        {hometown && (
          <p
            className="mt-3 text-sm italic"
            style={{ color: "#94a3b8" }}
          >
            {hometown}
          </p>
        )}
      </div>
    </div>
  );
}
