# Drill 24: In-Memory Key-Value Cache with TTL (Q72)

## Problem Statement
Expensive database queries or external API calls should be cached in-memory with a Time-To-Live (TTL) expiration.

## Task
Implement `class TtlCache` in `starter.js`.
- `.set(key, value, ttlMs)`: Stores key and value with expiry timestamp.
- `.get(key)`: Returns value if valid, or `null` if missing or expired (and deletes expired entry).
- `.has(key)`: Returns boolean.
- `.del(key)`: Deletes entry.
- `.size()`: Returns count of currently active entries.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#72-implement-an-in-memory-cache-with-a-ttl-for-an-expensive-endpoint)
