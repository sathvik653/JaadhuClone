import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50">
      <div className="p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="mt-12 space-y-6">
          <Link
            to="/"
            className="block text-xl text-gray-300 hover:text-white"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="block text-xl text-gray-300 hover:text-white"
            onClick={onClose}
          >
            Movies
          </Link>
          <Link
            to="/tv"
            className="block text-xl text-gray-300 hover:text-white"
            onClick={onClose}
          >
            TV Shows
          </Link>
        </nav>
      </div>
    </div>
  );
}