// solution.js
async function parseCsvStream(readable) {
  const rows = [];
  let buffer = '';
  let headers = null;

  for await (const chunk of readable) {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    // Keep last partial line in buffer
    buffer = lines.pop();

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      const cols = line.split(',').map((s) => s.trim());
      if (!headers) {
        headers = cols;
      } else {
        const row = {};
        headers.forEach((h, i) => {
          row[h] = cols[i] || '';
        });
        rows.push(row);
      }
    }
  }

  // Process any leftover line
  if (buffer && buffer.trim()) {
    const cols = buffer.trim().split(',').map((s) => s.trim());
    if (headers) {
      const row = {};
      headers.forEach((h, i) => {
        row[h] = cols[i] || '';
      });
      rows.push(row);
    }
  }

  return rows;
}

module.exports = { parseCsvStream };
