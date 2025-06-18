'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DatePicker from '../../components/DatePicker';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { detailedListingsData } from '../../data/listings';

function ListingDetail() {
  const params = useParams();
  const { id } = params;

  const listingData = detailedListingsData[id];

  if (!listingData) {
    return (
      <div>
        <Header />
        <main className="max-w-7xl mx-auto px-8 sm:px-16 pt-6">
          <h1 className="text-4xl font-semibold pb-5">Listing Not Found</h1>
          <p>The property you are looking for does not exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold pb-5">{listingData.title}</h1>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 rounded-xl overflow-hidden mb-6">
            <div className="relative col-span-2 row-span-2 h-[400px]">
              <Image src={listingData.images[0]} layout="fill" objectFit="cover" alt="Main Listing Image" />
            </div>
            {listingData.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[200px]">
                <Image src={image} layout="fill" objectFit="cover" alt={`Listing Image ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Left Column - Property Details */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-3">{listingData.location}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {listingData.guests} guests · {listingData.bedrooms} bedroom · {listingData.beds} bed · {listingData.bathrooms} bathrooms
              </p>

              {/* Guest Favourite / Rating / Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="flex items-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.071 3.292a1 1 0 00.95.691h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.031a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.031a1 1 0 00-1.176 0l-2.8 2.031c-.784.565-1.839-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.691l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-semibold">Guest favourite</span>
                </span>
                <span className="font-bold">{listingData.rating}</span>
                <span className="text-gray-600">({listingData.reviews} reviews)</span>
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-4 border-t border-b py-6 mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src={listingData.host.avatar} layout="fill" objectFit="cover" alt="Host Avatar" />
                </div>
                <div>
                  <h4 className="font-semibold">Hosted by {listingData.host.name}</h4>
                  <p className="text-sm text-gray-600">{listingData.host.yearsHosting} year hosting</p>
                </div>
              </div>

              {/* Description */}
              <h2 className="text-xl font-semibold mb-3">About this space</h2>
              <p className="text-gray-700 mb-6">{listingData.description.main}</p>

              {/* Features/Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {listingData.description.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <i className={feature.icon}></i> {/* Assuming font-awesome or similar for icons */}
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column - Booking Box */}
            <div className="lg:w-128 md:w-128 flex-shrink-0 p-6 border rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-bold">{listingData.currency}{listingData.price} <span className="font-normal text-base text-gray-600">/ night</span></p>
                <p className="text-sm text-gray-600">Prices include all fees</p>
              </div>
              <DatePicker />
              <div className="mt-4">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                <select
                  id="guests"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>
              <button className="w-full px-6 py-3 mt-6 text-white bg-red-400 rounded-lg hover:bg-red-500 transition duration-150">
                Reserve
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ListingDetail; 