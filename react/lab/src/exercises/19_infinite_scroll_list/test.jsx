// test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { InfiniteList } = await import(target);

describe('REACT-19: Infinite Scroll List', () => {
  let triggerIntersect;

  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      triggerIntersect = (isIntersecting) => callback([{ isIntersecting }]);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn()
      };
    });
  });

  it('triggers onLoadMore when sentinel intersects view', () => {
    const onLoadMore = vi.fn();
    render(<InfiniteList items={['Item 1', 'Item 2']} hasMore={true} onLoadMore={onLoadMore} />);

    expect(screen.getByTestId('sentinel')).toBeDefined();

    triggerIntersect(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
