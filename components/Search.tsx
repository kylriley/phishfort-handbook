'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FlexSearch from 'flexsearch';

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  content: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Mobile Search Component - completely separate implementation
function MobileSearch({
  index,
  documents,
  isReady,
  hasError
}: {
  index: any;
  documents: SearchResult[];
  isReady: boolean;
  hasError: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure the modal is rendered
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Perform search
  const doSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim() || !index) {
      setResults([]);
      return;
    }

    const searchResults = index.search(searchQuery, { limit: 15, suggest: true });
    const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
    setResults(resultDocs);
  };

  // Handle selecting a result
  const selectResult = (href: string) => {
    router.push(href);
    closeSearch();
  };

  // Close and reset
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Open search"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Full Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex flex-col bg-white">
          {/* Header with search input */}
          <div className="flex-shrink-0 bg-primary-800 px-4 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => doSearch(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full px-4 py-2.5 pl-10 text-base text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={closeSearch}
                className="px-3 py-2 text-white text-sm font-medium"
                aria-label="Close search"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto bg-white">
            {/* Loading State */}
            {!isReady && !hasError && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <svg className="w-10 h-10 text-primary-400 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500">Loading search...</p>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-gray-600 font-medium">Search unavailable</p>
                <p className="text-gray-400 text-sm mt-1">Please try again later</p>
              </div>
            )}

            {/* Empty State - No Query */}
            {isReady && !hasError && !query && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500">Type to search documentation</p>
              </div>
            )}

            {/* No Results */}
            {isReady && !hasError && query && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 font-medium">No results found</p>
                <p className="text-gray-400 text-sm mt-1">Try different search terms</p>
              </div>
            )}

            {/* Results List */}
            {isReady && !hasError && results.length > 0 && (
              <div className="divide-y divide-gray-100">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectResult(result.href)}
                    className="w-full text-left px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 mb-1">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {result.excerpt}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Desktop Search Component
function DesktopSearch({
  index,
  documents,
  isReady,
  hasError
}: {
  index: any;
  documents: SearchResult[];
  isReady: boolean;
  hasError: boolean;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Perform search
  const doSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    if (!index) {
      setResults([]);
      return;
    }

    const searchResults = index.search(searchQuery, { limit: 15, suggest: true });
    const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
    setResults(resultDocs);
  };

  // Re-run search when index loads
  useEffect(() => {
    if (index && query.trim()) {
      const searchResults = index.search(query, { limit: 15, suggest: true });
      const resultDocs = searchResults.map((idx: number) => documents[idx]).filter(Boolean);
      setResults(resultDocs);
    }
  }, [index, documents, query]);

  // Update dropdown position
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen, results]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('desktop-search-input')?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectResult = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="hidden md:block relative" ref={containerRef}>
      <input
        id="desktop-search-input"
        type="text"
        value={query}
        onChange={(e) => doSearch(e.target.value)}
        onFocus={() => query && setIsOpen(true)}
        placeholder="Search documentation... (⌘K)"
        className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent shadow-sm placeholder:text-gray-500"
      />
      <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <div className="absolute right-3 top-2.5 flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">⌘</kbd>
        <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 text-gray-500 rounded">K</kbd>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-96 overflow-y-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {/* Loading */}
            {!isReady && !hasError && (
              <div className="px-4 py-6 text-center">
                <svg className="w-8 h-8 mx-auto text-primary-400 mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm text-gray-600">Loading search...</p>
              </div>
            )}

            {/* Error */}
            {hasError && (
              <div className="px-4 py-6 text-center">
                <svg className="w-12 h-12 mx-auto text-red-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-gray-600">Search unavailable</p>
              </div>
            )}

            {/* No Results */}
            {isReady && !hasError && results.length === 0 && (
              <div className="px-4 py-6 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm text-gray-600">No results found for &quot;{query}&quot;</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
              </div>
            )}

            {/* Results */}
            {isReady && !hasError && results.length > 0 && (
              <div className="p-2">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectResult(result.href)}
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
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Main Search Component - handles index loading
export function Search() {
  const [index, setIndex] = useState<any>(null);
  const [documents, setDocuments] = useState<SearchResult[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Load search index once
  useEffect(() => {
    const searchIndex = new FlexSearch.Index({
      tokenize: 'full',
      cache: true,
      resolution: 9,
      context: true
    });

    fetch(`${basePath}/search-index.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        data.forEach((doc: SearchResult, idx: number) => {
          searchIndex.add(idx, `${doc.title} ${doc.content}`);
        });
        setIndex(searchIndex);
        setDocuments(data);
        setIsReady(true);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
        setHasError(true);
      });
  }, []);

  return (
    <div className="relative z-[10000]">
      <MobileSearch index={index} documents={documents} isReady={isReady} hasError={hasError} />
      <DesktopSearch index={index} documents={documents} isReady={isReady} hasError={hasError} />
    </div>
  );
}
