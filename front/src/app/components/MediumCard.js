import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

function MediumCard({ img, location, price, nights, rating }) {
  return (
    <div className="flex flex-col space-y-2 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-80 w-80">
        <Image
          src={img}
          alt={location}
          fill
          className="rounded-xl"
          style={{ objectFit: "cover" }}
        />
        <HeartIcon className="absolute top-3 right-3 h-7 cursor-pointer text-white" />
      </div>

      <div className="flex justify-between">
        <h3 className="text-lg font-medium">{location}</h3>
        <div className="flex items-center">
          <StarIcon className="h-5 text-red-400" />
          <p className="ml-1">{rating}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500">2,000 kilometers away</p>
      <p className="text-sm text-gray-500">Nov 1-6</p>
      <p className="text-lg font-semibold">
        ${price} <span className="font-light">night</span>
      </p>
    </div>
  );
}

export default MediumCard; 