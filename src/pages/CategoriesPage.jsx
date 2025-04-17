import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = '46a8b45b'

function CategoriesPage() {
  const [genres] = useState([
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi',
    'Romance', 'Thriller', 'Animation', 'Adventure', 'Fantasy'
  ])
  
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])
  
  // Fetch movies when a genre is selected
  useEffect(() => {
    if (selectedGenre) {
      setLoading(true)
      setError(null)
      
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${selectedGenre}&type=movie&page=1`)
        .then(response => response.json())
        .then(data => {
          if (data.Search) {
            setMovies(data.Search.slice(0, 12))
            setLoading(false)
          } else {
            setError('No movies found for this genre')
            setMovies([])
            setLoading(false)
          }
        })
        .catch(err => {
          console.error('Fetch Error:', err)
          setError('Failed to fetch movies')
          setLoading(false)
        })
    }
  }, [selectedGenre])
  
  // Function to toggle favorite status
  const toggleFavorite = (movie) => {
    let updatedFavorites = [...favorites]
    
    // Check if movie is already a favorite
    const index = favorites.findIndex(fav => fav.imdbID === movie.imdbID)
    
    if (index !== -1) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID)
    } else {
      // Add to favorites
      updatedFavorites.push(movie)
    }
    
    // Update state and localStorage
    setFavorites(updatedFavorites)
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites))
  }

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.imdbID === movieId)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Categories</h1>
      
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {genres.map((genre) => (
          <button 
            key={genre} 
            className={`px-4 py-2 rounded-full ${
              selectedGenre === genre 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading && <div className="text-white text-center w-full">Loading movies...</div>}
      {error && <div className="text-red-500 text-center w-full">Error: {error}</div>}
      
      {selectedGenre && !loading && !error && movies.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No movies found for {selectedGenre}. Try another category.
        </div>
      )}
      
      {selectedGenre && movies.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">{selectedGenre} Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {movies.map((movie) => (
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
                      onClick={() => toggleFavorite(movie)}
                      className={`px-3 py-1 rounded-lg text-black ${isFavorite(movie.imdbID) ? 'bg-red-500' : 'bg-yellow-500'}`}
                    >
                      {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
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
        </div>
      )}
      
      {!selectedGenre && (
        <div className="text-center text-gray-400 mt-10">
          Select a genre to browse movies
        </div>
      )}
    </div>
  )
}

export default CategoriesPage