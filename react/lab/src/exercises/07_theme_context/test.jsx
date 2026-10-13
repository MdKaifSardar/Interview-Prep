// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { ThemeProvider, ThemeToggle } = await import(target);

describe('REACT-07: Theme Context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('toggles theme and updates localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const themeEl = screen.getByTestId('current-theme');
    const button = screen.getByTestId('toggle-btn');

    expect(themeEl.textContent).toBe('light');

    fireEvent.click(button);
    expect(themeEl.textContent).toBe('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');

    fireEvent.click(button);
    expect(themeEl.textContent).toBe('light');
    expect(localStorage.getItem('app-theme')).toBe('light');
  });
});
