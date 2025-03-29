import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center border border-white rounded-lg overflow-hidden w-full max-w-md mx-auto">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..." 
        className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
      />
      <button type="submit" className="bg-yellow-500 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar



// import React from 'react'

// function SearchBar() {
//   return (
//     <div className="flex items-center border border-white rounded-lg overflow-hidden w-full max-w-md mx-auto">
//     <input 
//       type="text" 
//       placeholder="Search movies..." 
//       className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
//     />
//     <button className="bg-yellow-500 p-3">
//       🔍
//     </button>
//   </div>
//   );
// }

// export default SearchBar