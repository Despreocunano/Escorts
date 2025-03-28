import React, { useState, useEffect, useRef } from 'react';
import { ModelsService } from '../../services/models.service';

interface Suggestions {
  attributes: string[];
  services: string[];
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<Suggestions>({ attributes: [], services: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const modelsService = ModelsService.getInstance();
      const suggestions = await modelsService.getSearchSuggestions();
      setAllSuggestions(suggestions);
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const term = searchTerm.toUpperCase();
    
    // Combine all available suggestions
    const allAvailableSuggestions = [
      ...allSuggestions.attributes,
      ...allSuggestions.services
    ];

    // Filter and sort suggestions
    const filteredSuggestions = allAvailableSuggestions
      .filter(suggestion => suggestion.includes(term))
      .sort((a, b) => {
        // Exact matches first
        if (a === term && b !== term) return -1;
        if (b === term && a !== term) return 1;
        // Starts with term next
        if (a.startsWith(term) && !b.startsWith(term)) return -1;
        if (b.startsWith(term) && !a.startsWith(term)) return 1;
        // Alphabetical order for the rest
        return a.localeCompare(b);
      });

    // Remove duplicates and limit to 5
    const uniqueSuggestions = [...new Set(filteredSuggestions)].slice(0, 5);

    setSuggestions(uniqueSuggestions);
    setShowSuggestions(uniqueSuggestions.length > 0 && document.activeElement === inputRef.current);
  }, [searchTerm, allSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showSuggestions && suggestions.length > 0) {
      // If suggestions are visible, use the first suggestion
      handleSuggestionClick(suggestions[0]);
    } else {
      // Otherwise, perform search with current search term
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
      window.dispatchEvent(new CustomEvent('modelSearch', { 
        detail: { searchTerm } 
      }));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    window.dispatchEvent(new CustomEvent('modelSearch', { 
      detail: { searchTerm: suggestion } 
    }));
  };

  const handleInputFocus = () => {
    if (searchTerm.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) {
      setShowSuggestions(false);
      setSuggestions([]);
      window.dispatchEvent(new CustomEvent('modelSearch', { 
        detail: { searchTerm: '' } 
      }));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.dispatchEvent(new CustomEvent('modelSearch', { 
      detail: { searchTerm: '' } 
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input 
          ref={inputRef}
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Escribe lo que buscas, servicio, ubicación, contextura, apariencia, etc..." 
          className="w-full bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-lg border border-white/20 pr-24 focus:outline-none focus:border-red-800"
        />
        
        {/* Clear button */}
        {searchTerm && (
          <button 
            type="button"
            onClick={handleClearSearch}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search button */}
        <button 
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}