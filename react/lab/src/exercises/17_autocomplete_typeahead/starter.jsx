// starter.jsx
import React, { useState } from 'react';

export function SearchAutocomplete({ items = [], onSelect }) {
  // TODO: Search input, matching list, select handler
  return (
    <div>
      <input data-testid="search-input" />
      <ul data-testid="suggestions-list"></ul>
    </div>
  );
}
