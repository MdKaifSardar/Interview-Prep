// solution.jsx
import React, { useState } from 'react';

export function SearchAutocomplete({ items = [], onSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = query.trim()
    ? items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelect = (item) => {
    setQuery(item);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div>
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && filtered.length > 0 && (
        <ul data-testid="suggestions-list">
          {filtered.map((item) => (
            <li
              key={item}
              data-testid={"suggestion-" + item}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
