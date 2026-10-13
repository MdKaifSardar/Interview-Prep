// solution.jsx
import React, { useState, useRef } from 'react';

export function UserProfileForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const bioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        username,
        bio: bioRef.current ? bioRef.current.value : ''
      });
    }
  };

  return (
    <form data-testid="profile-form" onSubmit={handleSubmit}>
      <input
        data-testid="username-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span data-testid="char-count">{username.length}</span>
      <textarea data-testid="bio-input" ref={bioRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
