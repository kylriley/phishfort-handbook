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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [index, setIndex] = useState<any>(null);
  const [documents, setDocuments] = useState<SearchResult[]>([]);
  const [isIndexLoading, setIsIndexLoading] = useState(true);
  const [indexError, setIndexError] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Initialize search index
  useEffect(() => {
    const searchIndex = new FlexSearch.Index({
      tokenize: 'full',
      cache: true,
      resolution: 9,
      context: true
    });

    setIsIndexLoading(true);
    setIndexError(false);

    // Fetch search index data
    fetch(`${basePath}/search-index.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch search index');
        return res.json();
      })
      .then(data => {
        data.forEach((doc: SearchResult, idx: number) => {
          searchIndex.add(idx, `${doc.title} ${doc.content}`);
        });
        setIndex(searchIndex);
        setDocuments(data);
        setIsIndexLoading(false);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
        setIsIndexLoading(false);
        setIndexError(true);
      });
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

    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Keep isOpen true so user sees loading/error/no-results state
    setIsOpen(true);

    if (!index) {
      setResults([]);
      return;
    }

    const searchResults = index.search(searchQuery, {
      limit: 15,
      suggest: true
    });
    const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
    setResults(resultDocs);
  }, [index, documents]);

  // Re-run search when index loads (if there's already a query)
  useEffect(() => {
    if (index && query.trim()) {
      const searchResults = index.search(query, {
        limit: 15,
        suggest: true
      });
      const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
      setResults(resultDocs);
    }
  }, [index, documents, query]);

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

  // Handle closing mobile search
  const closeMobileSearch = useCallback(() => {
    setIsExpanded(false);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="relative z-[10000]">
      {/* Mobile: Magnifying glass button */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors ${isExpanded ? 'hidden' : 'block'}`}
        aria-label="Open search"
      >
        <svg
          className="w-5 h-5 text-white"
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
      </button>

      {/* Mobile: Expanded search overlay */}
      {isExpanded && (
        <div className="md:hidden fixed inset-0 z-[10001] bg-primary-900/50 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1" ref={searchContainerRef}>
                <input
                  ref={inputRef}
                  id="search-input-mobile"
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => query && setIsOpen(true)}
                  placeholder="Search documentation..."
                  className="w-full px-4 py-3 pl-10 pr-4 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg"
                />
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
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
              </div>
              <button
                onClick={closeMobileSearch}
                className="p-2 text-white hover:text-primary-200 transition-colors"
                aria-label="Close search"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile search results */}
            {isOpen && results.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow-xl max-h-[70vh] overflow-y-auto">
                <div className="p-2">
                  {results.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleSelectResult(result.href);
                        closeMobileSearch();
                      }}
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
            )}

            {/* Mobile loading state */}
            {isOpen && query && isIndexLoading && (
              <div className="mt-4 bg-white rounded-xl shadow-xl px-4 py-6 text-center">
                <svg className="w-8 h-8 mx-auto text-primary-400 mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm text-gray-600">Loading search...</p>
              </div>
            )}

            {/* Mobile error state */}
            {isOpen && query && !isIndexLoading && indexError && (
              <div className="mt-4 bg-white rounded-xl shadow-xl px-4 py-6 text-center">
                <svg className="w-12 h-12 mx-auto text-red-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-gray-600">Search unavailable</p>
                <p className="text-xs text-gray-400 mt-1">Please try again later</p>
              </div>
            )}

            {/* Mobile no results */}
            {isOpen && query && !isIndexLoading && !indexError && results.length === 0 && (
              <div className="mt-4 bg-white rounded-xl shadow-xl px-4 py-6 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm text-gray-600">No results found for &quot;{query}&quot;</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop: Full search bar */}
      <div className="hidden md:block relative" ref={!isExpanded ? searchContainerRef : undefined}>
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
        <div className="absolute right-3 top-2.5 flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">K</kbd>
        </div>
      </div>

      {/* Desktop: Search Results Dropdown */}
      {isOpen && results.length > 0 && !isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="hidden md:block fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />

          {/* Results */}
          <div
            ref={dropdownRef}
            className="hidden md:block fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-96 overflow-y-auto"
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

      {/* Desktop: Loading State */}
      {isOpen && query && isIndexLoading && !isExpanded && (
        <div
          ref={dropdownRef}
          className="hidden md:block fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] px-4 py-6 text-center"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          <svg className="w-8 h-8 mx-auto text-primary-400 mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-600">Loading search...</p>
        </div>
      )}

      {/* Desktop: Error State */}
      {isOpen && query && !isIndexLoading && indexError && !isExpanded && (
        <div
          ref={dropdownRef}
          className="hidden md:block fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] px-4 py-6 text-center"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          <svg className="w-12 h-12 mx-auto text-red-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-gray-600">Search unavailable</p>
          <p className="text-xs text-gray-400 mt-1">Please try again later</p>
        </div>
      )}

      {/* Desktop: No Results */}
      {isOpen && query && !isIndexLoading && !indexError && results.length === 0 && !isExpanded && (
        <div
          ref={dropdownRef}
          className="hidden md:block fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] px-4 py-6 text-center"
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
