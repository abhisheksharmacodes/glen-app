'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Header = ({ searchInput, setSearchInput }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isListingPage = pathname.startsWith('/listings/');
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we still want to clear local data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
        <span className='text-2xl font-bold'>StayFinder</span>
      </div>

      {/* Middle - Search */}
      {!isListingPage && (
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder="Search destinations"
          />
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:inline-flex h-8 w-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}

      {/* Right - User Menu */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        {user ? (
          <>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors ${
                  isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <p className="hidden md:inline cursor-pointer">Login</p>
            </Link>
            <Link href="/register">
              <p className="hidden md:inline cursor-pointer">Register</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 