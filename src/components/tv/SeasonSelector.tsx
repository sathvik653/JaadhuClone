import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SeasonSelectorProps {
  seasons: number;
  currentSeason: number;
  onSeasonChange: (season: number) => void;
}

export function SeasonSelector({ seasons, currentSeason, onSeasonChange }: SeasonSelectorProps) {
  return (
    <div className="relative">
      <select
        value={currentSeason}
        onChange={(e) => onSeasonChange(Number(e.target.value))}
        className="appearance-none bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {Array.from({ length: seasons }, (_, i) => i + 1).map((season) => (
          <option key={season} value={season}>
            Season {season}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
}