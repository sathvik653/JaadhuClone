import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getTMDBImageUrl } from '../lib/utils';
import { Movie, TVShow } from '../types/tmdb';

interface ContentSliderProps {
  title: string;
  items: (Movie | TVShow)[];
  className?: string;
}

export function ContentSlider({ title, items, className }: ContentSliderProps) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = direction === 'left' ? -400 : 400;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(sliderRef.current.scrollLeft + scrollAmount);
  };

  return (
    <div className={cn('relative px-4 md:px-6', className)}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ display: scrollPosition <= 0 ? 'none' : 'block' }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/${('title' in item ? 'movie' : 'tv')}/${item.id}`}
              className="flex-none w-[200px] md:w-[240px] transition-transform hover:scale-105"
            >
              <img
                src={getTMDBImageUrl(item.poster_path)}
                alt={'title' in item ? item.title : item.name}
                className="w-full h-[300px] md:h-[360px] object-cover rounded-lg shadow-lg"
              />
              <h3 className="mt-2 text-white text-sm md:text-base font-medium truncate">
                {'title' in item ? item.title : item.name}
              </h3>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}