import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = '46a8b45b'

function Movie({ searchTerm }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


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

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=${page}`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 12))
          setTotalResults(parseInt(data.totalResults) || 0)
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
  }, [searchTerm, page]) // Added page to dependency array

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


  // Calculate total pages
  const totalPages = Math.ceil(totalResults / 10); // OMDB returns 10 results per page

  // Handle page change
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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

      {/* Pagination Controls */}
      {totalResults > 0 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-500' : 'bg-yellow-500'} text-black`}
          >
            Previous
          </button>
          <span className="text-white">Page {page} of {totalPages}</span>
          <button 
            onClick={handleNextPage} 
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-500' : 'bg-yellow-500'} text-black`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

// export default Movie

// import { useEffect, useState } from 'react';

// const API_KEY = '46a8b45b';

// export default function MovieApp() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const totalPages = Math.ceil(totalResults / 10); // OMDB returns 10 per page

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     setMovies([]); // Reset movies on new fetch

//     let query = searchTerm || [
//       'Avengers', 'Moana', 'Toy Story', 'Coming to America', 
//       'Mean Girls', 'Bridget Jones', 'Cars', 'Batman', 
//       'Spider-Man', 'Girls Trip'
//     ][Math.floor(Math.random() * 10)];

//     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=${page}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.Response === "True") {
//           setMovies(data.Search); // Remove slice(0, 12), API gives 10 per page
//           setTotalResults(parseInt(data.totalResults) || 0);
//         } else {
//           setMovies([]);
//           setError('No movies found');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch Error:', err);
//         setError('Failed to fetch movies');
//         setLoading(false);
//       });
//   }, [searchTerm, page]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1); // Reset page to 1 on new search
//     setSearchTerm(e.target.elements.search.value);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   const handlePrevPage = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   return (
//     <div className="bg-black text-white p-4">
//       <h1 className="text-3xl text-yellow-500 mb-4">Movie Search</h1>
//       <form onSubmit={handleSearch} className="mb-4">
//         <input 
//           type="text" 
//           name="search" 
//           className="p-2 rounded text-black" 
//           placeholder="Search movies..." 
//         />
//         <button type="submit" className="ml-2 bg-yellow-500 px-4 py-2 rounded">Search</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <div key={movie.imdbID} className="p-2 border rounded">
//             <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
//             <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
//             <p>{movie.Year}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-4">
//         <button 
//           onClick={handlePrevPage} 
//           disabled={page <= 1} 
//           className={`px-4 py-2 mx-2 rounded ${page <= 1 ? 'bg-gray-500' : 'bg-yellow-500'}`}>
//           Prev
//         </button>

//         <span className="px-4 py-2">Page {page} of {totalPages}</span>

//         <button 
//           onClick={handleNextPage} 
//           disabled={page >= totalPages} 
//           className={`px-4 py-2 mx-2 rounded ${page >= totalPages ? 'bg-gray-500' : 'bg-yellow-500'}`}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


