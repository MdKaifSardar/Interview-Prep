// starter.jsx
import React, { useState } from 'react';

export function ValidatedRegistrationForm({ onSubmit }) {
  // TODO: Track values and validation errors
  return (
    <form data-testid="reg-form">
      <input data-testid="input-email" />
      <span data-testid="error-email"></span>
      <input data-testid="input-password" />
      <span data-testid="error-password"></span>
      <button type="submit">Register</button>
    </form>
  );
}
