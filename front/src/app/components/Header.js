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
    <header className="sticky top-0 z-50 flex justify-between bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
        <span className='text-2xl font-bold'>StayFinder</span>
      </div>


      {/* Right - User Menu */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        {user ? (
          <>
            <div className="hidden md:flex bg-red items-center space-x-2">
              <span className="text-gray-700">Welcome, {user.name.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`px-4 py-2 text-sm rounded-lg hover:text-red-600 cursor-pointer transition-colors ${
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