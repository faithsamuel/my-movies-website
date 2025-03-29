import React, { useState } from 'react'
import Hero from "../components/Hero";
import Movie from "../components/movie";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <section className="bg-gray-900 text-white py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {searchQuery ? `Results for "${searchQuery}"` : "Movies"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          <Movie searchTerm={searchQuery} />
        </div>
      </section>
    </div>
  )
}

export default HomePage

// import React from 'react'
// import Hero from "../components/Hero";
// import Movie from "../components/movie";


// function HomePage() {
//   return (
//     <div>
//         <Hero/>
//        <section className="bg-gray-900 text-white py-10 px-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Movies</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
//         <Movie />
//       </div>
//     </section>
//     </div>
//   )
// }

// export default HomePage