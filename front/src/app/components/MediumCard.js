import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

function MediumCard({ img, location, price, nights, rating }) {
  return (
    <div className="flex flex-col w-60 space-y-2 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-60 w-60">
        <Image
          src={img}
          alt={location}
          fill
          className="rounded-xl"
          style={{ objectFit: "cover" }}
        />

      </div>
      <h3 className="text-md font-medium">{location}</h3>
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">
          ${price} <span className="font-light">night</span>
        </p>
        <div className="flex">
          <StarIcon className="h-5 text-red-400" />
          <p className="ml-1">{rating}</p>
        </div>
      </div>
    </div>
  );
}

export default MediumCard; 