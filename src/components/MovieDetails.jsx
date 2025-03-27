import React from 'react'

function MovieDetails() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white py-6">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gray-700 flex items-center px-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex gap-6 items-center">
          <img className="w-60 h-80 object-cover rounded-lg" src="https://via.placeholder.com/200" alt="Movie Poster" />
          <div>
            <h1 className="text-3xl font-bold">Movie Title</h1>
            <p className="text-lg text-gray-400">⭐ 8.5 | 2025</p>
            <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-black flex items-center gap-2">
              ❤️ Add to Favorites
            </button>
          </div>
        </div>
      </div>
      
      {/* Movie Description */}
      <div className="mt-6 px-6">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
      </div>
      
      {/* Additional Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 1</div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 2</div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 3</div>
      </div>

      {/* Extra 1 */}
      <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
      </div>

      {/* Extra 2 */}
      <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
      </div>

    </div>
  );
}

export default MovieDetails