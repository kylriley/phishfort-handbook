'use client';

import { useState, useEffect, useCallback } from 'react';
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

  return (
    <div className="relative">
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search documentation... (⌘K)"
          className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm placeholder:text-gray-500"
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
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Results */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectResult(result.href)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {result.title}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {result.excerpt}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 px-4 py-3 text-sm text-gray-600">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
