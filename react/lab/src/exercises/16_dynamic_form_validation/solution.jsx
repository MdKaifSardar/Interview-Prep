// solution.jsx
import React, { useState } from 'react';

export function ValidatedRegistrationForm({ onSubmit }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      errs.email = 'Invalid email';
    }
    if (!values.password || values.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form data-testid="reg-form" onSubmit={handleSubmit}>
      <input
        data-testid="input-email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      {errors.email && <span data-testid="error-email">{errors.email}</span>}

      <input
        data-testid="input-password"
        type="password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />
      {errors.password && <span data-testid="error-password">{errors.password}</span>}

      <button type="submit">Register</button>
    </form>
  );
}
