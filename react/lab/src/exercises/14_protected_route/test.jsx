// test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { ProtectedRoute } = await import(target);

describe('REACT-14: ProtectedRoute Guard', () => {
  it('redirects when unauthenticated and displays content when authenticated', () => {
    // 1. Unauthenticated
    const { rerender } = render(
      <ProtectedRoute user={null} redirectPath="/signin">
        <span>Secret Dashboard</span>
      </ProtectedRoute>
    );

    expect(screen.getByTestId('redirect-to').textContent).toBe('/signin');
    expect(screen.queryByText('Secret Dashboard')).toBeNull();

    // 2. Authenticated
    rerender(
      <ProtectedRoute user={{ id: 1, name: 'Kaif' }} redirectPath="/signin">
        <span>Secret Dashboard</span>
      </ProtectedRoute>
    );

    expect(screen.queryByTestId('redirect-to')).toBeNull();
    expect(screen.getByText('Secret Dashboard')).toBeDefined();
  });
});
