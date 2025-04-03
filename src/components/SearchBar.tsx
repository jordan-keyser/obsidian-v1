
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  resultsCount?: number;
  totalCount?: number;
}

/**
 * SearchBar component - Provides a search input with clear functionality
 * @param {SearchBarProps} props - Component properties
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search...",
  resultsCount,
  totalCount
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  /**
   * Debounce search term to prevent excessive filtering
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      onSearch(searchTerm);
    }, 300); // 300ms debounce delay for smoother experience

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  /**
   * Handle changes to the search input
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  /**
   * Clear the search input
   */
  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedTerm('');
    onSearch('');
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-md mx-auto mb-8">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          aria-label="Search tiles"
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Results counter - show when searching with increased padding */}
      {typeof resultsCount !== 'undefined' && typeof totalCount !== 'undefined' && (
        <div className={`text-sm text-center mt-3 mb-4 transition-opacity duration-300 ${debouncedTerm ? 'opacity-100' : 'opacity-0'}`}>
          Showing {resultsCount} of {totalCount} tiles
        </div>
      )}
    </div>
  );
};

export default SearchBar;
