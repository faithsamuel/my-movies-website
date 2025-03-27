import React from 'react'

function SearchBar() {
  return (
    <div className="flex items-center border border-white rounded-lg overflow-hidden w-full max-w-md mx-auto">
    <input 
      type="text" 
      placeholder="Search movies..." 
      className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
    />
    <button className="bg-yellow-500 p-3">
      🔍
    </button>
  </div>
  );
}

export default SearchBar