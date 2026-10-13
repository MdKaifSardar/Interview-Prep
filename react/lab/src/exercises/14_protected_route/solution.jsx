// solution.jsx
import React from 'react';

export function ProtectedRoute({ user, redirectPath = '/login', children }) {
  if (!user) {
    return <div data-testid="redirect-to">{redirectPath}</div>;
  }

  return <div data-testid="protected-content">{children}</div>;
}
