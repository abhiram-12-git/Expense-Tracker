import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { SearchContext } from "../context/searchContext.jsx";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { searchText, setSearchText } = useContext(SearchContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-pink-700 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Expense Tracker
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            value={searchText || ""}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-300"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/add" className="hover:text-gray-200">Add Transaction</Link>
          <Link to="/showTrans" className="hover:text-gray-200">Show Transactions</Link>
          <button
            onClick={logout}
            className="ml-4 bg-white text-pink-700 px-3 py-1 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col space-y-2 px-6 pb-4">
          {/* Mobile Search */}
          <input
            type="text"
            value={searchText || ""}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search transactions..."
            className="px-4 py-2 w-full rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-300 mb-2"
          />

          <Link to="/" className="block py-2 border-b border-pink-600 hover:text-gray-200" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/add" className="block py-2 border-b border-pink-600 hover:text-gray-200" onClick={() => setOpen(false)}>Add Transaction</Link>
          <Link to="/showTrans" className="block py-2 border-b border-pink-600 hover:text-gray-200" onClick={() => setOpen(false)}>Show Transactions</Link>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="w-[70px] text-left mt-2 bg-white text-pink-700 px-3 py-2 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
