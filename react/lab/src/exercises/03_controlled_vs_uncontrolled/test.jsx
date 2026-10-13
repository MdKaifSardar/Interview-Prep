// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { UserProfileForm } = await import(target);

describe('REACT-03: Controlled vs Uncontrolled Form', () => {
  it('tracks username in controlled state and extracts bio via ref on submit', () => {
    const handleSubmit = vi.fn();
    render(<UserProfileForm onSubmit={handleSubmit} />);

    const userInput = screen.getByTestId('username-input');
    const bioInput = screen.getByTestId('bio-input');
    const charCount = screen.getByTestId('char-count');
    const form = screen.getByTestId('profile-form');

    fireEvent.change(userInput, { target: { value: 'kaif' } });
    expect(charCount.textContent).toBe('4');

    bioInput.value = 'Full-stack developer';
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'kaif',
      bio: 'Full-stack developer'
    });
  });
});
