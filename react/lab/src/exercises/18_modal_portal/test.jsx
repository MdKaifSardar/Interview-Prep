// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { Modal } = await import(target);

describe('REACT-18: Modal Portal', () => {
  it('renders into body, closes on backdrop click and ESC key', () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Body</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    const content = screen.getByTestId('modal-content');

    // Click inside modal should not trigger close
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();

    // Click backdrop closes
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);

    // ESC key closes
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
