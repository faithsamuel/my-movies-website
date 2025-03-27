import React from 'react'

function Nav() {
  return (
    <nav className="text-white p-4 m-4 flex justify-between items-center ">
      {/* Logo */}
      <div className="text-xl font-bold">🍿MovieSearch</div>
      
      {/* Links */}
      <div className="flex gap-6">
        <a href="#" className="hover:text-yellow-500">Home</a>
        <a href="#" className="hover:text-yellow-500">Favourites</a>
      </div>
    </nav>
  );
}

export default Nav