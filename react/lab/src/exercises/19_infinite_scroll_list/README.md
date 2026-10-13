# Drill 19: Infinite Scroll Data List Sentinel (Q67)

## Problem Statement
Infinite scrolling loads new batches of records as the user scrolls near the bottom of the list. Observing a bottom sentinel element with `IntersectionObserver` is much more performant than attaching raw scroll listeners.

## Task
Implement `<InfiniteList items={items} hasMore={hasMore} onLoadMore={loadMore} />` in `starter.jsx`.
- Renders list items in `<ul data-testid="items-list">`.
- If `hasMore` is true, renders sentinel element `<div data-testid="sentinel" />` at bottom.
- Observes sentinel using `IntersectionObserver`. When it intersects, calls `onLoadMore()`.
- Cleans up observer on unmount.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#67-implement-a-paginated--infinite-scroll-data-list-component-using-intersectionobserver-or-scroll-events)
