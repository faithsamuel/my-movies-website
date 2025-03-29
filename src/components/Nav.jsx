import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="text-white p-4 m-4 flex justify-between items-center ">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">🍿MovieSearch</Link>
      
      {/* Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-500">Home</Link>
        <Link to="/favorites" className="hover:text-yellow-500">Favorites</Link>
      </div>
    </nav>
  );
}

export default Nav