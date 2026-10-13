// test.jsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { useLocalStorage } = await import(target);

describe('REACT-10: useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads initial value, updates state and synchronizes with localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('user_name', 'Guest'));
    expect(result.current[0]).toBe('Guest');

    act(() => {
      result.current[1]('Kaif');
    });

    expect(result.current[0]).toBe('Kaif');
    expect(JSON.parse(localStorage.getItem('user_name'))).toBe('Kaif');

    // Test functional updater
    act(() => {
      result.current[1]((prev) => prev + ' Sardar');
    });

    expect(result.current[0]).toBe('Kaif Sardar');
    expect(JSON.parse(localStorage.getItem('user_name'))).toBe('Kaif Sardar');
  });
});
