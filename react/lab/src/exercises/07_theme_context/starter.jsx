// starter.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // TODO: Initialize theme from localStorage, provide toggleTheme
  return children;
}

export function useTheme() {
  // TODO: useContext(ThemeContext)
  return {};
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
