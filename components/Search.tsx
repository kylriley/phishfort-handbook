'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FlexSearch from 'flexsearch';

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  content: string;
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<any>(null);
  const [documents, setDocuments] = useState<SearchResult[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize search index
  useEffect(() => {
    const searchIndex = new FlexSearch.Index({
      tokenize: 'full',
      cache: true,
      resolution: 9,
      context: true
    });

    // Fetch search index data
    fetch('/api/search-index')
      .then(res => res.json())
      .then(data => {
        data.forEach((doc: SearchResult, idx: number) => {
          searchIndex.add(idx, `${doc.title} ${doc.content}`);
        });
        setIndex(searchIndex);
        setDocuments(data);
      })
      .catch(err => console.error('Failed to load search index:', err));
  }, []);

  // Update dropdown position
  useEffect(() => {
    if (isOpen && searchContainerRef.current) {
      const rect = searchContainerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen, results]);

  // Perform search
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim() || !index) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = index.search(searchQuery, {
      limit: 15,
      suggest: true
    });
    const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
    setResults(resultDocs);
    setIsOpen(true);
  }, [index, documents]);

  // Handle result selection
  const handleSelectResult = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on scroll (only if scrolling outside the search area)
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if scroll is happening inside the search container or dropdown
      if (
        searchContainerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return; // Don't close if scrolling inside search area
      }
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  return (
    <div className="relative z-[10000]">
      <div className="relative" ref={searchContainerRef}>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search documentation... (⌘K)"
          className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent shadow-sm placeholder:text-gray-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <div className="absolute right-3 top-2.5 hidden sm:flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">K</kbd>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />

          {/* Results */}
          <div 
            ref={dropdownRef}
            className="fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-96 overflow-y-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            <div className="p-2">
              {results.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResult(result.href)}
                  className="w-full text-left px-4 py-3 hover:bg-primary-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-primary-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-semibold text-gray-900 group-hover:text-primary-700">
                      {result.title}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-2 pl-6">
                    {result.excerpt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div 
          ref={dropdownRef}
          className="fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] px-4 py-6 text-center"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm text-gray-600">No results found for &quot;{query}&quot;</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
