import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favoriteMovies')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movieId)
    setFavorites(updatedFavorites)
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <p className="text-center">No favorites yet. Start by adding some movies to your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="w-full max-w-xs p-2 bg-gray-800 rounded-lg">
              <img 
                className="w-full h-60 object-cover rounded-lg" 
                src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300x450"} 
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Image"
                }}
              />
              
              <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-400">{movie.Year}</p>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-500 font-bold">🎬 {movie.Type}</span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => removeFavorite(movie.imdbID)}
                    className="bg-red-500 px-3 py-1 rounded-lg text-black"
                  >
                    ❌
                  </button>
                  <Link 
                    to={`/movie/${movie.imdbID}`} 
                    className="text-yellow-500 underline"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage