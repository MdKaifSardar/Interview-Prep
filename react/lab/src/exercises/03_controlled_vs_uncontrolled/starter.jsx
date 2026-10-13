// starter.jsx
import React, { useState, useRef } from 'react';

export function UserProfileForm({ onSubmit }) {
  // TODO: username in state, bio in ref
  return (
    <form data-testid="profile-form">
      <input data-testid="username-input" />
      <span data-testid="char-count">0</span>
      <textarea data-testid="bio-input" />
      <button type="submit">Submit</button>
    </form>
  );
}
