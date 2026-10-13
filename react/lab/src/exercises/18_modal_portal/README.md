# Drill 18: Modal Dialog using createPortal (Q66)

## Problem Statement
Modals should escape parent CSS `overflow: hidden` or `z-index` stacking contexts by rendering directly into `document.body` using `createPortal`.

## Task
Implement `<Modal isOpen={isOpen} onClose={handleClose}>{children}</Modal>` in `starter.jsx`.
- Uses `createPortal` to render into `document.body`.
- Backdrop element (`data-testid="modal-backdrop"`): Clicking it triggers `onClose()`.
- Modal content container (`data-testid="modal-content"`): Clicking inside must NOT close the modal (`e.stopPropagation()`).
- Listens for `Escape` key press and calls `onClose()`.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#66-build-a-modal-dialog-component-using-react-portals-createportal-that-closes-on-esc-key-or-backdrop-click)
