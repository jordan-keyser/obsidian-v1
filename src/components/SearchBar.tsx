
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

/**
 * SearchBar component - Provides a search input with clear functionality
 * @param {SearchBarProps} props - Component properties
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle changes to the search input
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  /**
   * Clear the search input
   */
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative flex w-full max-w-md mx-auto mb-6">
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
    </div>
  );
};

export default SearchBar;
