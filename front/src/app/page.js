'use client';

import Image from "next/image";
import Header from './components/Header';
import MediumCard from './components/MediumCard';
import Footer from './components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const exploreData = [
    {
      img: "https://links.papareact.com/5j2",
      location: "London",
      distance: "45-minute drive",
    },
    {
      img: "https://links.papareact.com/1jm",
      location: "Manchester",
      distance: "4.5-hour drive",
    },
    {
      img: "https://links.papareact.com/dmk",
      location: "Liverpool",
      distance: "4.5-hour drive",
    },
    {
      img: "https://links.papareact.com/d2l",
      location: "York",
      distance: "4-hour drive",
    },
    {
      img: "https://papareact.com/ijc",
      location: "Cardiff",
      distance: "45-minute drive",
    },
    {
      img: "https://links.papareact.com/msp",
      location: "Birkenhead",
      distance: "4.5-hour drive",
    },
    {
      img: "https://links.papareact.com/2pour",
      location: "Newquay",
      distance: "6-hour drive",
    },
    {
      img: "https://links.papareact.com/40m",
      location: "Hove",
      distance: "2-hour drive",
    },
  ];

  const cardsData = [
    {
      id: '1',
      img: "https://links.papareact.com/2io",
      location: "Flat in Gurugram",
      price: 7110,
      nights: 2,
      rating: 4.99,
    },
    {
      id: '2',
      img: "https://links.papareact.com/q7j",
      location: "Flat in Kerala",
      price: 5144,
      nights: 2,
      rating: 4.91,
    },
    {
      id: '3',
      img: "https://links.papareact.com/s03",
      location: "Hotel in Jaipur",
      price: 2064,
      nights: 2,
      rating: 4.73,
    },
    {
      id: '4',
      img: "https://www.orient-express.com/wp-content/uploads/2024/12/JUNIOR-SUITE_209_-Bedroom-scaled.jpg",
      location: "Flat in Manali",
      price: 3348,
      nights: 2,
      rating: 4.83,
    },
    {
      id: '5',
      img: "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg",
      location: "Room in Delhi",
      price: 2622,
      nights: 2,
      rating: 4.76,
    },
    {
      id: '6',
      img: "https://htl-img-res-new.s3.ap-south-1.amazonaws.com/8237/20250610/main.jpg",
      location: "Flat in Udaipur",
      price: 3398,
      nights: 2,
      rating: 4.92,
    },
  ];

  const largeCardData = {
    img: "https://links.papareact.com/4nj",
    title: "The Greatest Outdoors",
    description: "Wishlists curated by Airbnb.",
    buttonText: "Get Inspired",
  };

  // Filter properties based on search input
  const filteredProperties = cardsData.filter(property => 
    property.location.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <main>
        <section className="max-w-7xl mx-auto px-8 sm:px-16">
          <h2 className="text-4xl font-semibold py-8">Popular properties</h2>
          <div style={{scrollbarWidth:'none'}} className="flex space-x-3 overflow-x-scroll overflow-y-hidden scrollbar-hide p-3 -ml-3">
            {filteredProperties?.map(({ id, img, location, price, nights, rating }) => (
              <Link key={id} href={`/listings/${id}`}>
                <MediumCard
                  img={img}
                  location={location}
                  price={price}
                  nights={nights}
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
