import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_KEY = '46a8b45b'

function MovieDetails() {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Get the movie ID from the URL
  const { id } = useParams()

  useEffect(() => {
    // Check if movie is in favorites
    const storedFavorites = localStorage.getItem('favoriteMovies')
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some(fav => fav.imdbID === id))
    }

    // Fetch detailed movie information
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovie(data)
          setLoading(false)
        } else {
          setError('Movie not found')
          setLoading(false)
        }
      })
      .catch(err => {
        console.error('Fetch Error:', err)
        setError('Failed to fetch movie details')
        setLoading(false)
      })
  }, [id])

  const toggleFavorite = () => {
    let favorites = []
    const storedFavorites = localStorage.getItem('favoriteMovies')
    
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites)
    }
    
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter(fav => fav.imdbID !== id)
      setIsFavorite(false)
    } else {
      // Add to favorites
      favorites.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type
      })
      setIsFavorite(true)
    }
    
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites))
  }

  if (loading) return <div className="text-white text-center w-full">Loading movie details...</div>
  if (error) return <div className="text-red-500 text-center w-full">Error: {error}</div>
  if (!movie) return <div className="text-white text-center w-full">No movie found</div>

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white py-6">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gray-700 flex items-center px-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex gap-6 items-center">
          <img 
            className="w-60 h-80 object-cover rounded-lg" 
            src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/200"} 
            alt={movie.Title} 
          />
          <div>
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <p className="text-lg text-gray-400">⭐ {movie.imdbRating} | {movie.Year}</p>
            <button 
              onClick={toggleFavorite}
              className={`mt-4 px-4 py-2 rounded-lg text-black flex items-center gap-2 ${isFavorite ? 'bg-red-500' : 'bg-yellow-500'}`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Movie Description */}
      <div className="mt-6 px-6">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-400 mt-2">{movie.Plot}</p>
      </div>
      
      {/* Additional Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="font-bold">Director</h3>
          <p className="text-gray-400">{movie.Director}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="font-bold">Actors</h3>
          <p className="text-gray-400">{movie.Actors}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="font-bold">Genre</h3>
          <p className="text-gray-400">{movie.Genre}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails

// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'

// const API_KEY = '46a8b45b'

// function MovieDetails() {
//   const [movie, setMovie] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
  
//   // Get the movie ID from the URL
//   const { id } = useParams()

//   useEffect(() => {
//     // Fetch detailed movie information
//     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.Response === 'True') {
//           setMovie(data)
//           setLoading(false)
//         } else {
//           setError('Movie not found')
//           setLoading(false)
//         }
//       })
//       .catch(err => {
//         console.error('Fetch Error:', err)
//         setError('Failed to fetch movie details')
//         setLoading(false)
//       })
//   }, [id])

//   if (loading) return <div className="text-white text-center w-full">Loading movie details...</div>
//   if (error) return <div className="text-red-500 text-center w-full">Error: {error}</div>
//   if (!movie) return <div className="text-white text-center w-full">No movie found</div>

//   return (
//     <div className="w-full min-h-screen bg-gray-900 text-white py-6">
//       {/* Hero Section */}
//       <div className="relative w-full h-96 bg-gray-700 flex items-center px-10">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative flex gap-6 items-center">
//           <img 
//             className="w-60 h-80 object-cover rounded-lg" 
//             src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/200"} 
//             alt={movie.Title} 
//           />
//           <div>
//             <h1 className="text-3xl font-bold">{movie.Title}</h1>
//             <p className="text-lg text-gray-400">⭐ {movie.imdbRating} | {movie.Year}</p>
//             <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-black flex items-center gap-2">
//               ❤️ Add to Favorites
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Movie Description */}
//       <div className="mt-6 px-6">
//         <h2 className="text-2xl font-semibold">Description</h2>
//         <p className="text-gray-400 mt-2">{movie.Plot}</p>
//       </div>
      
//       {/* Additional Sections */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
//         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
//           <h3 className="font-bold">Director</h3>
//           <p className="text-gray-400">{movie.Director}</p>
//         </div>
//         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
//           <h3 className="font-bold">Actors</h3>
//           <p className="text-gray-400">{movie.Actors}</p>
//         </div>
//         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
//           <h3 className="font-bold">Genre</h3>
//           <p className="text-gray-400">{movie.Genre}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails



// // import React from 'react'

// // function MovieDetails() {
// //   return (
// //     <div className="w-full min-h-screen bg-gray-900 text-white py-6">
// //       {/* Hero Section */}
// //       <div className="relative w-full h-96 bg-gray-700 flex items-center px-10">
// //         <div className="absolute inset-0 bg-black opacity-50"></div>
// //         <div className="relative flex gap-6 items-center">
// //           <img className="w-60 h-80 object-cover rounded-lg" src="https://via.placeholder.com/200" alt="Movie Poster" />
// //           <div>
// //             <h1 className="text-3xl font-bold">Movie Title</h1>
// //             <p className="text-lg text-gray-400">⭐ 8.5 | 2025</p>
// //             <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-black flex items-center gap-2">
// //               ❤️ Add to Favorites
// //             </button>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Movie Description */}
// //       <div className="mt-6 px-6">
// //         <h2 className="text-2xl font-semibold">Description</h2>
// //         <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
// //       </div>
      
// //       {/* Additional Sections */}
// //       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
// //         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 1</div>
// //         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 2</div>
// //         <div className="p-4 bg-gray-800 rounded-lg shadow-lg">More Info 3</div>
// //       </div>

// //       {/* Extra 1 */}
// //       <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold">Description</h2>
// //         <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
// //       </div>

// //       {/* Extra 2 */}
// //       <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold">Description</h2>
// //         <p className="text-gray-400 mt-2">This is a brief description of the movie, highlighting key details and storyline.</p>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MovieDetails