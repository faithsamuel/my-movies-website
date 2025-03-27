import React from 'react'

function Movie() {
  return (
    <div className="w-full max-w-xs p-2 bg-gray-800 rounded-lg">
      {/* Movie Image - Takes full space */}
      <img className="w-full h-60 object-cover rounded-lg" src="https://via.placeholder.com/150" alt="Movie Poster" />
      
      {/* Movie Info */}
      <h2 className="text-lg font-bold mt-2">Movie Title</h2>
      <p className="text-sm text-gray-400">Short description of the movie goes here...</p>
      
      {/* Rating and Buttons */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-yellow-500 font-bold">⭐ 8.5</span>
        <div className="flex gap-3">
          <button className="bg-yellow-500 px-3 py-1 rounded-lg text-black">❤️</button>
          <button className="text-yellow-500 underline">See Details</button>
        </div>
      </div>
    </div>
  );
}

export default Movie