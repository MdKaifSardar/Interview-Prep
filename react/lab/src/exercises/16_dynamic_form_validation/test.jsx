// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { ValidatedRegistrationForm } = await import(target);

describe('REACT-16: Form with Custom Validation', () => {
  it('blocks invalid submissions with errors and submits valid form', () => {
    const onSubmit = vi.fn();
    render(<ValidatedRegistrationForm onSubmit={onSubmit} />);

    const form = screen.getByTestId('reg-form');
    const emailInput = screen.getByTestId('input-email');
    const passInput = screen.getByTestId('input-password');

    // 1. Submit invalid
    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    fireEvent.change(passInput, { target: { value: '123' } });
    fireEvent.submit(form);

    expect(screen.getByTestId('error-email').textContent).toBe('Invalid email');
    expect(screen.getByTestId('error-password').textContent).toBe('Password must be at least 6 characters');
    expect(onSubmit).not.toHaveBeenCalled();

    // 2. Fix values and submit
    fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
    fireEvent.change(passInput, { target: { value: 'securePass123' } });
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'valid@test.com',
      password: 'securePass123'
    });
  });
});
