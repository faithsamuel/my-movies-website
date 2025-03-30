import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = '46a8b45b'

function Movie({ searchTerm }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    
    let query = searchTerm
    
    // If no search term is provided, use a random movie title
    if (!query) {
      const searchTerms = [
        'Avengers', 'Moana', 'Toy Story', 'Coming to America', 
        'Mean Girls', 'Bridget Jones', 'Cars', 'Batman', 
        'Spider-Man', 'Girls Trip'
      ]
      query = searchTerms[Math.floor(Math.random() * searchTerms.length)]
    }

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=1`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 12))
          setLoading(false)
        } else {
          setError('No movies found')
          setLoading(false)
        }
      })
      .catch(err => {
        console.error('Fetch Error:', err)
        setError('Failed to fetch movies')
        setLoading(false)
      })
  }, [searchTerm])

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

  if (loading) return <div className="text-white text-center w-full">Loading movies...</div>
  if (error) return <div className="text-red-500 text-center w-full">Error: {error}</div>

  return (
    <>
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
    </>
  )
}

export default Movie

// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// const API_KEY = '46a8b45b'

// function Movie() {
//   const [movies, setMovies] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const searchTerms = [
//       'Avengers', 
//       'Legally Blonde', 
//       'Catwoman', 
//       'Coming to America', 
//       'Mean Girls', 
//       'Bridget Jones', 
//       'Pretty Woman', 
//       'Batman', 
//       'Spider-Man', 
//       'Girls Trip'
//     ]
//     const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

//     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomTerm}&type=movie&page=1`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.Search) {
//           setMovies(data.Search.slice(0, 12))
//           setLoading(false)
//         } else {
//           setError('No movies found')
//           setLoading(false)
//         }
//       })
//       .catch(err => {
//         console.error('Fetch Error:', err)
//         setError('Failed to fetch movies')
//         setLoading(false)
//       })
//   }, [])

//   if (loading) return <div className="text-white text-center w-full">Loading movies...</div>
//   if (error) return <div className="text-red-500 text-center w-full">Error: {error}</div>

//   return (
//     <>
//       {movies.map((movie) => (
//         <div key={movie.imdbID} className="w-full max-w-xs p-2 bg-gray-800 rounded-lg">
//           <img 
//             className="w-full h-60 object-cover rounded-lg" 
//             src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300x450"} 
//             alt={movie.Title}
//             onError={(e) => {
//               e.target.onerror = null; 
//               e.target.src = "https://via.placeholder.com/300x450?text=No+Image"
//             }}
//           />
          
//           <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
//           <p className="text-sm text-gray-400">{movie.Year}</p>
          
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-yellow-500 font-bold">🎬 {movie.Type}</span>
//             <div className="flex gap-3">
//               <button className="bg-yellow-500 px-3 py-1 rounded-lg text-black">❤️</button>
//               <Link 
//                 to={`/movie/${movie.imdbID}`} 
//                 className="text-yellow-500 underline"
//               >
//                 See Details
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   )
// }

// export default Movie