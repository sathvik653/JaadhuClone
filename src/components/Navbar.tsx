import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlayCircle, Menu, X } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { SearchResults } from './SearchResults';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();

  const closeSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/95 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <PlayCircle className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white hidden md:inline">
              StreamFlix
            </span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link
              to="/movies"
              className="text-gray-300 hover:text-white transition"
            >
              Movies
            </Link>
            <Link to="/tv" className="text-gray-300 hover:text-white transition">
              TV Shows
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            {isSearching ? (
              <div className="absolute right-3 top-2.5 w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
            ) : (
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            )}
            <SearchResults
              results={searchResults}
              onResultClick={closeSearch}
            />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Search className="w-6 h-6 text-gray-300" />
            )}
          </button>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-3 border-t border-gray-800">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchResults
            results={searchResults}
            onResultClick={() => {
              closeSearch();
              setIsSearchOpen(false);
            }}
          />
        </div>
      )}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}