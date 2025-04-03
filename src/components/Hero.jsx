
import React from 'react'
import SearchBar from './SearchBar';

function Hero({ onSearch }) {
  return (
    <section className="relative bg-gray-700 text-white h-screen flex flex-col items-center justify-center px-6">
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Search for Movies</h1>
        
        {/* Search Bar */}
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}

export default Hero
