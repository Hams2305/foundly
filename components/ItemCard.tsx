import Link from "next/link"; 

interface ItemCardProps {
  type: "LOST" | "FOUND";
  title: string;
  description: string;
  image: string;
}

export default function ItemCard({ type, title, description, image }: ItemCardProps) {
  return (
    <Link href="/item/1">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F1EAE2] cursor-pointer hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-40 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {/* Badge */}
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${type === "LOST" ? "bg-[#C48B96]" : "bg-[#8E867D]"}`}>
            {type}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-[#4A4238] text-[15px]">{title}</h3>
          <p className="text-[#7A7268] text-[12px] mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}