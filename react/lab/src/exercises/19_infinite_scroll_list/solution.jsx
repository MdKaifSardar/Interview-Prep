// solution.jsx
import React, { useRef, useEffect } from 'react';

export function InfiniteList({ items = [], hasMore = false, onLoadMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && onLoadMore) {
        onLoadMore();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, onLoadMore]);

  return (
    <div>
      <ul data-testid="items-list">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      {hasMore && <div ref={sentinelRef} data-testid="sentinel" />}
    </div>
  );
}
