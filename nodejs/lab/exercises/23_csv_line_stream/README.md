# Drill 23: Line-by-Line CSV Stream Parser (Q70)

## Problem Statement
Loading multi-gigabyte CSV files into memory crashes the Node.js process. Streaming chunk by chunk and splitting lines safely keeps memory usage constant (O(1)).

## Task
Implement `parseCsvStream(readableStream)` in `starter.js`.
- Reads chunks from a readable stream.
- Splits lines without missing rows that cross chunk boundaries.
- Uses first line as CSV headers.
- Emits or returns a Promise resolving to an array of parsed row objects `[{ [header]: value }]`.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#70-stream-a-large-file-to-the-client-or-process-a-large-csv-line-by-line-without-loading-it-into-memory)
