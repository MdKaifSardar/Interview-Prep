// starter.jsx
import React, { useRef, useEffect } from 'react';

export function InfiniteList({ items = [], hasMore = false, onLoadMore }) {
  // TODO: Observe sentinelRef with IntersectionObserver
  return (
    <div>
      <ul data-testid="items-list">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      {hasMore && <div data-testid="sentinel" />}
    </div>
  );
}
