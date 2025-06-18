'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InfoCard from '../../components/InfoCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchResults as allSearchResults } from '../../data/listings';

function Search() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');

  const filteredResults = allSearchResults.filter((result) =>
    result.location.toLowerCase().includes(location?.toLowerCase() || '')
  );

  return (
    <div>
      <Header />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays - Dates - 1-2 Guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location || "Gurugram"}</h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {filteredResults.length > 0 ? (
              filteredResults.map(({ id, img, location, title, description, star, price, total }) => (
                <Link key={id} href={`/listings/${id}`}>
                  <InfoCard
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  />
                </Link>
              ))
            ) : (
              <p className="text-center text-xl mt-10">No listings found for "{location}".</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search; 