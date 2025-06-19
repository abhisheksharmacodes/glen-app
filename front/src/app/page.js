'use client';

import Image from "next/image";
import Header from './components/Header';
import MediumCard from './components/MediumCard';
import Footer from './components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:4998/api/listings');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredProperties = listings.filter(property => 
    property.location.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <main>
        <section className="max-w-7xl mx-auto px-8 sm:px-16">
          <h2 className="text-4xl font-semibold py-8">Popular properties</h2>
          <div style={{scrollbarWidth:'none'}} className="flex space-x-3 overflow-x-scroll overflow-y-hidden scrollbar-hide p-3 -ml-3">
            {filteredProperties?.map(({ _id, images, location, price, rating }) => (
              <Link key={_id} href={`/listings/${_id}`}>
                <MediumCard
                  img={images[0]}
                  location={location}
                  price={price}
                  nights={2}
                  rating={rating}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
