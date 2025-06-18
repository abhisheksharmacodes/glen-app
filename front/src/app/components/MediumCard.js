import Image from "next/image";

function MediumCard({ img, location, price, nights, rating }) {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} layout="fill" className="rounded-xl" alt="Card Image" />        
      </div>
      <h3 className="text-xl mt-3 font-semibold">{location}</h3>
      <p className="text-sm text-gray-700">₹{price} for {nights} nights <span className="text-gray-500">·</span> <span className="text-red-400">★</span> {rating}</p>
    </div>
  );
}

export default MediumCard; 